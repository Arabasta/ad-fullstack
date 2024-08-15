package com.robotrader.spring.service;

import com.robotrader.spring.aws.s3.S3TransactionLogger;
import com.robotrader.spring.aws.ses.SesPortfolioNotificationService;
import com.robotrader.spring.dto.portfolio.PortfolioAllocateFundsDTO;
import com.robotrader.spring.dto.portfolio.PortfolioBalanceDTO;
import com.robotrader.spring.dto.portfolio.PortfolioTransactionResponseDTO;
import com.robotrader.spring.dto.portfolio.PortfolioWithdrawFundsDTO;
import com.robotrader.spring.exception.InsufficientFundsException;
import com.robotrader.spring.exception.notFound.PortfolioNotFoundException;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.Wallet;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.PortfolioRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.service.interfaces.IRuleService;
import com.robotrader.spring.service.interfaces.IWalletService;
import com.robotrader.spring.service.log.PortfolioHistoryLogService;
import com.robotrader.spring.service.log.PortfolioTransactionLogService;
import com.robotrader.spring.service.log.WalletTransactionLogService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService implements IPortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final IRuleService ruleService;
    private final ICustomerService customerService;
    private final IWalletService walletService;
    private final UserService userService;
    private final S3TransactionLogger s3TransactionLogger;
    private final PortfolioTransactionLogService portfolioTransactionLogService;
    private final PortfolioHistoryLogService portfolioHistoryLogService;
    private final SesPortfolioNotificationService sesPortfolioNotificationService;
    private final WalletTransactionLogService walletTransactionLogService;
    private final MoneyPoolService moneyPoolService;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository, IRuleService ruleService,
                            @Lazy ICustomerService customerService, IWalletService walletService, Optional<S3TransactionLogger> s3TransactionLogger,
                            PortfolioTransactionLogService portfolioTransactionLogService, @Lazy UserService userService, PortfolioHistoryLogService portfolioHistoryLogService,
                            Optional<SesPortfolioNotificationService> sesPortfolioNotificationService, WalletTransactionLogService walletTransactionLogService,
                            @Lazy MoneyPoolService moneyPoolService) {
        this.portfolioRepository = portfolioRepository;
        this.ruleService = ruleService;
        this.customerService = customerService;
        this.walletService = walletService;
        this.s3TransactionLogger = s3TransactionLogger.orElse(null);
        this.portfolioTransactionLogService = portfolioTransactionLogService;
        this.userService = userService;
        this.portfolioHistoryLogService = portfolioHistoryLogService;
        this.sesPortfolioNotificationService = sesPortfolioNotificationService.orElse(null);
        this.walletTransactionLogService = walletTransactionLogService;
        this.moneyPoolService = moneyPoolService;
    }

    @Override
    @Transactional
    public void save(Portfolio portfolio) {
        portfolioRepository.save(portfolio);
    }

    @Override
    public List<Portfolio> getPortfolios() {
        return portfolioRepository.findAll();
    }

    @Override
    @Transactional
    public List<Portfolio> initBasePortfolios() {
        List<Portfolio> portfolios = new ArrayList<>();

        for (PortfolioTypeEnum portfolioType : PortfolioTypeEnum.values()) {
            Portfolio portfolio = new Portfolio();
            portfolio.setPortfolioType(portfolioType);
            portfolio.setRule(ruleService.initBaseRules());
            save(portfolio);
            portfolios.add(portfolio);
        }
        return portfolios;
    }

    @Override
    public List<Portfolio> getUserPortfolios(String username) {
        List<Portfolio> portfolios = customerService.getCustomerByUsername(username).getPortfolios();
        if (portfolios == null)
            throw new PortfolioNotFoundException("Portfolios not found");
        return portfolios;
    }

    @Override
    public Portfolio getPortfolioByUsernameAndType(String username, PortfolioTypeEnum portfolioType) {
        List<Portfolio> portfolio = getUserPortfolios(username);
        for (Portfolio p : portfolio) {
            if (p.getPortfolioType().equals(portfolioType))
                return p;
        }
        return null;
    }

    @Override
    public PortfolioBalanceDTO getPortfolioDTOByUsernameAndType(String username, PortfolioTypeEnum portfolioType) {
        Portfolio portfolio = getPortfolioByUsernameAndType(username, portfolioType);
        if (portfolio == null)
            throw new PortfolioNotFoundException("Portfolio not found");
        return new PortfolioBalanceDTO(portfolio.getPortfolioType(), portfolio.getAllocatedBalance(), portfolio.getCurrentValue());
    }

    @Override
    @Transactional
    public PortfolioTransactionResponseDTO allocateFundsToPortfolio(String username, PortfolioAllocateFundsDTO portfolioAllocateFundsDTO) {
        Portfolio portfolio = getPortfolioByUsernameAndType(username, portfolioAllocateFundsDTO.getPortfolioType());
        BigDecimal amount = portfolioAllocateFundsDTO.getAmount();
        Wallet wallet = walletService.getWalletByUsername(username);

        walletService.withdrawAmountFromWallet(wallet, amount);
        addFundsToPortfolio(portfolio, amount);
        if (s3TransactionLogger != null) {
            s3TransactionLogger.logPortfolioTransaction(username, portfolio.getPortfolioType(), amount, portfolio.getCurrentValue(), "Allocate");
            s3TransactionLogger.logWalletTransaction(username, amount, wallet.getTotalBalance(), "Allocate to Portfolio " + portfolio.getPortfolioType());
        } else {
            User user = userService.getUserByUsername(username);
            portfolioTransactionLogService.log(user, portfolio.getPortfolioType(), "Allocate", amount, portfolio.getCurrentValue());
            portfolioHistoryLogService.log(portfolio, "Allocate");

            walletTransactionLogService.log(user, amount, wallet.getTotalBalance(), "Allocate to Portfolio " + portfolio.getPortfolioType());
        }
        return new PortfolioTransactionResponseDTO(portfolio.getPortfolioType(), amount,
                portfolio.getAllocatedBalance(), portfolio.getCurrentValue());
    }

    @Override
    @Transactional
    public PortfolioTransactionResponseDTO withdrawFundsFromPortfolio(String username, PortfolioWithdrawFundsDTO portfolioWithdrawFundsDTO) {
        Portfolio portfolio = getPortfolioByUsernameAndType(username, portfolioWithdrawFundsDTO.getPortfolioType());
        BigDecimal amount = portfolioWithdrawFundsDTO.getAmount();
        Wallet wallet = walletService.getWalletByUsername(username);

        removeFundsFromPortfolio(portfolio, amount);
        walletService.addAmountToWallet(wallet, amount);

        if (s3TransactionLogger != null) {
            s3TransactionLogger.logPortfolioTransaction(username, portfolio.getPortfolioType(), amount, portfolio.getCurrentValue(), "Withdraw");
            s3TransactionLogger.logWalletTransaction(username, amount, wallet.getTotalBalance(), "Withdraw from Portfolio " + portfolio.getPortfolioType());
        } else {
            User user = userService.getUserByUsername(username);
            portfolioTransactionLogService.log(user, portfolio.getPortfolioType(), "Withdraw", amount, portfolio.getCurrentValue());
            portfolioHistoryLogService.log(portfolio, "Withdraw");
            walletTransactionLogService.log(user, amount, wallet.getTotalBalance(), "Withdraw from Portfolio " + portfolio.getPortfolioType());

        }
        return new PortfolioTransactionResponseDTO(portfolio.getPortfolioType(), amount,
                portfolio.getAllocatedBalance(), portfolio.getCurrentValue());
    }

    @Override
    @Transactional
    public void addFundsToPortfolio(Portfolio portfolio, BigDecimal amount) {
        portfolio.setAllocatedBalance(portfolio.getAllocatedBalance().add(amount));
        portfolio.setCurrentValue(portfolio.getCurrentValue().add(amount));

        BigDecimal newUnitsToAdd = moneyPoolService.updateFundsToMoneyPool(amount, portfolio.getPortfolioType(), true);
        portfolio.setAllocatedUnitQty(portfolio.getAllocatedUnitQty().add(newUnitsToAdd));

        ruleService.setStopLossInitialValue(portfolio.getRule(), portfolio.getCurrentValue());
        save(portfolio);
    }

    @Override
    @Transactional
    public void removeFundsFromPortfolio(Portfolio portfolio, BigDecimal amount) {
        if (portfolio.getCurrentValue().compareTo(amount) < 0)
            throw new InsufficientFundsException("Insufficient funds in portfolio");

        BigDecimal unitsToSubtract = moneyPoolService.updateFundsToMoneyPool(amount, portfolio.getPortfolioType(), false);
        portfolio.setAllocatedUnitQty(portfolio.getAllocatedUnitQty().subtract(unitsToSubtract));

        // remove from current value and reset allocated balance
        portfolio.setCurrentValue(portfolio.getCurrentValue().subtract(amount));
        BigDecimal portfolioAllocatedBalance = portfolio.getAllocatedBalance();
        if (portfolioAllocatedBalance.compareTo(amount) < 0) {
            portfolio.setAllocatedBalance(BigDecimal.ZERO);
        } else {
            portfolio.setAllocatedBalance(portfolio.getAllocatedBalance().subtract(amount));
        }
        ruleService.setStopLossInitialValue(portfolio.getRule(), portfolio.getCurrentValue());
        save(portfolio);
    }

    @Override
    @Transactional
    public void handleStopLoss(Portfolio portfolio) {
        stopLossWithdrawAllToWallet(portfolio);
        if (sesPortfolioNotificationService != null)
            sesPortfolioNotificationService.sendStopLossNotification(userService.getUserByPortfolio(portfolio).getUsername(),
                    userService.getUserByPortfolio(portfolio).getEmail(), portfolio.getPortfolioType().toString());
    }

    @Override
    @Transactional
    public void stopLossWithdrawAllToWallet(Portfolio portfolio) {
        walletService.addAmountToWallet(walletService.getWalletByPortfolio(portfolio), portfolio.getCurrentValue());
        portfolio.setCurrentValue(BigDecimal.ZERO);
        save(portfolio);
    }

    @Override
    @Transactional
    public void handleRecurringAllocation(Portfolio portfolio) {
        BigDecimal recurringAmount = portfolio.getRule().getRecurringAllocationAmount();
        Wallet wallet = walletService.getWalletByPortfolio(portfolio);
        walletService.withdrawAmountFromWallet(wallet, recurringAmount);
        if (s3TransactionLogger != null) {
            s3TransactionLogger.logPortfolioTransaction(userService.getUserByPortfolio(portfolio).getUsername(), portfolio.getPortfolioType(),
                    recurringAmount, portfolio.getCurrentValue(), "Recurring Allocation");
            s3TransactionLogger.logWalletTransaction(userService.getUserByPortfolio(portfolio).getUsername(), recurringAmount, wallet.getTotalBalance(),
                    "Recurring Allocation to Portfolio " + portfolio.getPortfolioType());
        } else {
            portfolioTransactionLogService.log(userService.getUserByPortfolio(portfolio), portfolio.getPortfolioType(),
                    "Recurring Allocation", recurringAmount, portfolio.getCurrentValue());
            walletTransactionLogService.log(userService.getUserByPortfolio(portfolio), recurringAmount, wallet.getTotalBalance(),
                    "Recurring Allocation to Portfolio " + portfolio.getPortfolioType());
        }

        addFundsToPortfolio(portfolio, recurringAmount);
        if (sesPortfolioNotificationService != null)
            sesPortfolioNotificationService.sendRecurringAllocationNotification(userService.getUserByPortfolio(portfolio).getUsername(),
                    userService.getUserByPortfolio(portfolio).getEmail(), portfolio.getPortfolioType().toString(), recurringAmount);
    }

    @Override
    public List<Portfolio> findPortfolioByType(PortfolioTypeEnum portfolioTypeEnum) {
        return portfolioRepository.findPortfolioByPortfolioType(portfolioTypeEnum);
    }

    @Override
    @Transactional
    public void updateTrade(BigDecimal newUnitPrice, PortfolioTypeEnum portfolioTypeEnum) {
        findPortfolioByType(portfolioTypeEnum)
                .stream()
                .forEach(portfolio -> {
                    if (portfolio.getAllocatedUnitQty().compareTo(BigDecimal.valueOf(0.0001)) > 0) {
                        portfolio.setCurrentValue(newUnitPrice.multiply(portfolio.getAllocatedUnitQty()));
                        save(portfolio);
                        portfolioHistoryLogService.log(portfolio, "Trade");
                    }
                });
    }
}
