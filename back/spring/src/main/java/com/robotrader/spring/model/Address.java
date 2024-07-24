package com.robotrader.spring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min=1, max=50, message = "Block, street, building, etc. cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String street;

    @Length(min=1, max=50, message = "City cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String city;

    @Length(min=1, max=50, message = "State cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String state;

    @Length(min=1, max=50, message = "Postal code cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String postalCode;

    @Length(min=1, max=50, message = "Country cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String country;

    @Length(min=1, max=50, message = "Unit number cannot be more than 10 characters")
    @Column(nullable = false, length = 10)
    private String unitNo;

}
