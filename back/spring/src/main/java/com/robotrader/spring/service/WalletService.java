package com.robotrader.spring.service;

import com.robotrader.spring.aws.s3.S3TransactionLogger;
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
import com.robotrader.spring.service.interfaces.IWalletService;
import com.robotrader.spring.service.log.WalletTransactionLogService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletService implements IWalletService {

    private final WalletRepository walletRepository;
    private final ICustomerService customerService;
    private final S3TransactionLogger s3TransactionLogger;
    private final WalletTransactionLogService walletTransactionLogService;
    private final UserService userService;

    @Autowired
    public WalletService(WalletRepository walletRepository, @Lazy ICustomerService customerService,
                         Optional<S3TransactionLogger> s3TransactionLogger, WalletTransactionLogService walletTransactionLogService,
                         @Lazy UserService userService) {
        this.walletRepository = walletRepository;
        this.customerService = customerService;
        this.s3TransactionLogger = s3TransactionLogger.orElse(null);
        this.walletTransactionLogService = walletTransactionLogService;
        this.userService = userService;
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
        this.addAmountToWallet(wallet, amount);
        if (s3TransactionLogger != null) {
            s3TransactionLogger.logWalletTransaction(username, amount, wallet.getTotalBalance(), "Deposit");
        } else {
            walletTransactionLogService.log(userService.getUserByUsername(username), amount, wallet.getTotalBalance(), "Deposit");
        }
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
        this.withdrawAmountFromWallet(wallet, amount);
        if (s3TransactionLogger != null) {
            s3TransactionLogger.logWalletTransaction(username, amount, wallet.getTotalBalance(), "Withdrawal");
        } else {
            walletTransactionLogService.log(userService.getUserByUsername(username), amount, wallet.getTotalBalance(), "Withdrawal");
        }
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
