package com.robotrader.spring.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Getter
@Setter
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "financial_profile_id")
    private FinancialProfile financialProfile;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "investor_profile_id")
    private InvestorProfile investorProfile;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private List<Portfolio> portfolios;

    @Length(min=8, max=8, message = "Username must be 3-20 characters")
    @Column(nullable = false, length = 15)
    private String mobileNumber;

    @Length(min=1, max=50, message = "Address cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String address;

    @Length(min=1, max=50, message = "First Name cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String firstName;

    @Length(min=1, max=50, message = "Last Name cannot be more than 50 characters")
    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 50)
    private String nationality;

    private boolean isDeleted;

    public Customer() {}

    public Customer(FinancialProfile financialProfile, InvestorProfile investorProfile, Wallet wallet,
                    String mobileNumber, String address, String firstName, String lastName, String nationality) {
        this.financialProfile = financialProfile;
        this.investorProfile = investorProfile;
        this.wallet = wallet;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationality = nationality;
        isDeleted = false;
    }
}
