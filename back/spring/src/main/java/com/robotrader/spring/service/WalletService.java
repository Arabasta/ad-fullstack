package com.robotrader.spring.service;

import com.robotrader.spring.dto.wallet.WalletAddFundsDTO;
import com.robotrader.spring.dto.wallet.WalletDTO;
import com.robotrader.spring.dto.wallet.WalletTransactionResponseDTO;
import com.robotrader.spring.dto.wallet.WalletWithdrawFundsDTO;
import com.robotrader.spring.exception.InsufficientFundsException;
import com.robotrader.spring.exception.notFound.WalletNotFoundException;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Wallet;
import com.robotrader.spring.repository.WalletRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IPaymentService;
import com.robotrader.spring.service.interfaces.IWalletService;
import com.robotrader.spring.service.payment.PaymentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletService implements IWalletService {

    private final WalletRepository walletRepository;
    private final IPaymentService paymentService;
    private final ICustomerService customerService;

    @Autowired
    public WalletService(WalletRepository walletRepository, IPaymentService paymentService, @Lazy ICustomerService customerService) {
        this.walletRepository = walletRepository;
        this.paymentService = paymentService;
        this.customerService = customerService;
    }

    @Override
    public void save(Wallet wallet) {
        walletRepository.save(wallet);
    }

    @Override
    @Transactional
    public Wallet initBaseWallet() {
        Wallet wallet = new Wallet();
        save(wallet);
        return wallet;
    }

    @Override
    public Wallet getWalletByUsername(String username) {
        Wallet wallet = customerService.getCustomerByUsername(username).getWallet();
        if (wallet == null) {
            throw new WalletNotFoundException("Wallet not found");
        }
        return wallet;
    }

    @Override
    public Wallet getWalletByPortfolio(Portfolio portfolio) {
        Wallet wallet = walletRepository.findByPortfolioId(portfolio.getId());
        if (wallet == null) {
            throw new WalletNotFoundException("Wallet not found");
        }
        return wallet;
    }

    @Override
    public WalletDTO getWalletDTOByUsername(String username) {
        Wallet wallet = getWalletByUsername(username);
        return new WalletDTO(wallet.getTotalBalance());
    }

    @Override
    @Transactional
    public WalletTransactionResponseDTO addFundsToWallet(String username, WalletAddFundsDTO walletAddFundsDTO) {
        Wallet wallet = getWalletByUsername(username);
        BigDecimal amount = walletAddFundsDTO.getAmount();
        paymentService.processPayment(username, amount);
        this.addAmountToWallet(wallet, amount);
        return new WalletTransactionResponseDTO(amount, wallet.getTotalBalance());
    }

    @Override
    @Transactional
    public void addAmountToWallet(Wallet wallet, BigDecimal amount) {
        wallet.setTotalBalance(wallet.getTotalBalance().add(amount));
        save(wallet);
    }

    @Override
    @Transactional
    public WalletTransactionResponseDTO withdrawFundsFromWallet(String username, WalletWithdrawFundsDTO walletWithdrawFundsDTO) {
        Wallet wallet = getWalletByUsername(username);
        BigDecimal amount = walletWithdrawFundsDTO.getAmount();
        paymentService.processWithdrawal(username, amount);
        this.withdrawAmountFromWallet(wallet, amount);
        return new WalletTransactionResponseDTO(amount, wallet.getTotalBalance());
    }

    @Override
    @Transactional
    public void withdrawAmountFromWallet(Wallet wallet, BigDecimal amount) {
        if (wallet.getTotalBalance().compareTo(amount) < 0)
            throw new InsufficientFundsException("Insufficient funds in wallet");
        wallet.setTotalBalance(wallet.getTotalBalance().subtract(amount));
        save(wallet);
    }
}
