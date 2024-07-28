package com.robotrader.spring.controller.customer;

import com.robotrader.spring.service.interfaces.IInvestorProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customer/investment-profile")
public class InvestorProfileControllerV1 {

    private final IInvestorProfileService investorProfileService;

    @Autowired
    public InvestorProfileControllerV1(IInvestorProfileService investorProfileService) {
        this.investorProfileService = investorProfileService;
    }

}
