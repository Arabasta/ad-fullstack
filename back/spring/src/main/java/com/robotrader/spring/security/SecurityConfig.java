package com.robotrader.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*
 * References:
 * https://stackoverflow.com/questions/74683225/updating-to-spring-security-6-0-replacing-removed-and-deprecated-functionality
 * https://www.geeksforgeeks.org/securing-rest-apis-with-spring-security/?ref=ml_lbp
 *
 * to check
 * https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html#servlet-authentication-unpwd
 * https://docs.spring.io/spring-security/reference/servlet/authentication/rememberme.html
 * https://docs.spring.io/spring-security/reference/servlet/authentication/logout.html
 *https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html
 * notes to self
 * https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html
 */

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                // using JWT so CSRF is not needed
                .csrf(AbstractHttpConfigurer::disable)
                // prevent http sessions from being created
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()

                        // allow all users to access
                        .requestMatchers(
                                "/api/login",
                                "/api/register",
                                "/api/health"
                        ).permitAll()

                        // CUSTOMER role required to access /api/health/customer
                        .requestMatchers(
                                "/api/health/customer"
                        ).hasAuthority("ROLE_CUSTOMER")

                        // ADMIN role required to access /api/health/admin
                        .requestMatchers(
                                "/api/health/admin"
                        ).hasAuthority("ROLE_ADMIN")

                        // all other endpoints require authentication
                        // temporarily allow all requests for development
                        .anyRequest().permitAll()
                )

                // validate JWT token before executing UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
