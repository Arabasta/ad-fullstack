package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.wallet.WalletAddFundsDTO;
import com.robotrader.spring.dto.wallet.WalletDTO;
import com.robotrader.spring.dto.wallet.WalletTransactionResponseDTO;
import com.robotrader.spring.dto.wallet.WalletWithdrawFundsDTO;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Wallet;

import java.math.BigDecimal;

public interface IWalletService {
    void save(Wallet wallet);
    Wallet initBaseWallet();
    Wallet getWalletByUsername(String username);
    Wallet getWalletByPortfolio(Portfolio portfolio);
    WalletDTO getWalletDTOByUsername(String username);
    WalletTransactionResponseDTO addFundsToWallet(String username, WalletAddFundsDTO walletAddFundsDTO);
    void addAmountToWallet(Wallet wallet, BigDecimal amount);
    WalletTransactionResponseDTO withdrawFundsFromWallet(String username, WalletWithdrawFundsDTO walletWithdrawFundsDTO);
    void withdrawAmountFromWallet(Wallet wallet, BigDecimal amount);
}
