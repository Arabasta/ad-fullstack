package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@Table(name = "pool")
public class Pool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private PortfolioTypeEnum portfolioType;

    @NotNull(message = "Amount cannot be null")
    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @DecimalMax(value = "1000000000.00", message = "Amount must be less than or equal to 1000000000.00")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal poolBalance;

    @NotNull(message = "Amount cannot be null")
    @DecimalMin(value = "0", message = "Amount must be greater than or equal to 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @NotNull(message = "Unit quantity cannot be null")
    @Min(value = 0, message = "Unit quantity must be greater than or equal to 0")
    private Integer totalUnitQty;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private ZonedDateTime tradeDateTime;

    public Pool() {}
}
