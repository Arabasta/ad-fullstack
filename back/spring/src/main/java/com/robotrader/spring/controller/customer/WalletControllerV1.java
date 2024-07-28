package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.wallet.WalletAddFundsDTO;
import com.robotrader.spring.dto.wallet.WalletDTO;
import com.robotrader.spring.dto.wallet.WalletTransactionResponseDTO;
import com.robotrader.spring.dto.wallet.WalletWithdrawFundsDTO;
import com.robotrader.spring.service.interfaces.IWalletService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/wallet")
public class WalletControllerV1 {

    private final IWalletService walletService;

    @Autowired
    public WalletControllerV1(IWalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<WalletDTO>> getWallet(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(new ApiResponse<>("success", "Wallet details retrieved successfully",
                walletService.getWalletDTOByUsername(username)));
    }

    @PostMapping("/add-funds")
    public ResponseEntity<ApiResponse<WalletTransactionResponseDTO>> addFunds(Authentication authentication,
                                                                              @Valid @RequestBody WalletAddFundsDTO walletAddFundsDTO) {
        String username = authentication.getName();
        WalletTransactionResponseDTO responseDTO = walletService.addFundsToWallet(username, walletAddFundsDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Funds added successfully", responseDTO));
    }

    @PostMapping("/withdraw-funds")
    public ResponseEntity<ApiResponse<WalletTransactionResponseDTO>> withdrawFunds(Authentication authentication,
                                                               @Valid @RequestBody WalletWithdrawFundsDTO walletWithdrawFundsDTO) {
        String username = authentication.getName();
        WalletTransactionResponseDTO responseDTO = walletService.withdrawFundsFromWallet(username, walletWithdrawFundsDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Funds withdrawn successfully", responseDTO));
    }
}
