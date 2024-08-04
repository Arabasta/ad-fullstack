package com.robotrader.spring.service;

import com.robotrader.spring.dto.bankDetails.BankDetailsDTO;
import com.robotrader.spring.dto.bankDetails.UpdateBankDetailsDTO;
import com.robotrader.spring.exception.notFound.BankDetailsNotFoundException;
import com.robotrader.spring.model.BankDetails;
import com.robotrader.spring.repository.BankDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class BankDetailsService {

    private final BankDetailsRepository bankDetailsRepository;
    private final UserService userService;

    @Autowired
    public BankDetailsService(BankDetailsRepository bankDetailsRepository, @Lazy UserService userService) {
        this.bankDetailsRepository = bankDetailsRepository;
        this.userService = userService;
    }

    public void save(BankDetails bankDetails) {
        bankDetailsRepository.save(bankDetails);
    }

    public BankDetails findByUsername(String username) {
        BankDetails bankDetails = userService.findByUsername(username).getCustomer().getBankDetails();
        if (bankDetails == null) {
            throw new BankDetailsNotFoundException("Bank details not found for user: " + username);
        }
        return bankDetails;
    }

    public BankDetailsDTO getBankDetailsDTO(String username) {
        BankDetails bankDetails = findByUsername(username);
        return new BankDetailsDTO(bankDetails.getId(), bankDetails.getBankName(), bankDetails.getAccountNumber(),
                bankDetails.getAccountHolderName());
    }

    public BankDetailsDTO updateBankDetails(String username, UpdateBankDetailsDTO updateBankDetailsDTO) {
        BankDetails bankDetails = findByUsername(username);
        bankDetails.setBankName(updateBankDetailsDTO.getBankName());
        bankDetails.setAccountNumber(updateBankDetailsDTO.getAccountNumber());
        bankDetails.setAccountHolderName(updateBankDetailsDTO.getAccountHolderName());
        bankDetailsRepository.save(bankDetails);

        return new BankDetailsDTO(bankDetails.getId(), bankDetails.getBankName(), bankDetails.getAccountNumber(),
                bankDetails.getAccountHolderName());
    }
}
