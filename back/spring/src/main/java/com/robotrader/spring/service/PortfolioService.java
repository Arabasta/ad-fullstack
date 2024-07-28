package com.robotrader.spring.service;

import com.robotrader.spring.dto.portfolio.PortfolioAllocateFundsDTO;
import com.robotrader.spring.dto.portfolio.PortfolioBalanceDTO;
import com.robotrader.spring.dto.portfolio.PortfolioTransactionResponseDTO;
import com.robotrader.spring.dto.portfolio.PortfolioWithdrawFundsDTO;
import com.robotrader.spring.exception.InsufficientFundsException;
import com.robotrader.spring.exception.notFound.PortfolioNotFoundException;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Wallet;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.repository.PortfolioRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import com.robotrader.spring.service.interfaces.IRuleService;
import com.robotrader.spring.service.interfaces.IWalletService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService implements IPortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final IRuleService ruleService;
    private final ICustomerService customerService;
    private final IWalletService walletService;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository, IRuleService ruleService,
                            @Lazy ICustomerService customerService, IWalletService walletService) {
        this.portfolioRepository = portfolioRepository;
        this.ruleService = ruleService;
        this.customerService = customerService;
        this.walletService = walletService;
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

        walletService.withdrawAmountFromWallet(walletService.getWalletByUsername(username), amount);
        addFundsToPortfolio(portfolio, amount);
        return new PortfolioTransactionResponseDTO(portfolio.getPortfolioType(), amount,
                portfolio.getAllocatedBalance(), portfolio.getCurrentValue());
    }

    @Override
    @Transactional
    public PortfolioTransactionResponseDTO withdrawFundsFromPortfolio(String username, PortfolioWithdrawFundsDTO portfolioWithdrawFundsDTO) {
        Portfolio portfolio = getPortfolioByUsernameAndType(username, portfolioWithdrawFundsDTO.getPortfolioType());
        BigDecimal amount = portfolioWithdrawFundsDTO.getAmount();

        removeFundsFromPortfolio(portfolio, amount);
        walletService.addAmountToWallet(walletService.getWalletByUsername(username), amount);
        return new PortfolioTransactionResponseDTO(portfolio.getPortfolioType(), amount,
                portfolio.getAllocatedBalance(), portfolio.getCurrentValue());
    }

    @Override
    @Transactional
    public void addFundsToPortfolio(Portfolio portfolio, BigDecimal amount) {
        portfolio.setAllocatedBalance(portfolio.getAllocatedBalance().add(amount));
        portfolio.setCurrentValue(portfolio.getCurrentValue().add(amount));
        ruleService.setStopLossInitialValue(portfolio.getRule(), portfolio.getCurrentValue());
        save(portfolio);
    }

    @Override
    @Transactional
    public void removeFundsFromPortfolio(Portfolio portfolio, BigDecimal amount) {
        if (portfolio.getAllocatedBalance().compareTo(amount) < 0)
            throw new InsufficientFundsException("Insufficient funds in portfolio");

        // remove from current value and reset allocated balance
        portfolio.setCurrentValue(portfolio.getCurrentValue().subtract(amount));
        portfolio.setAllocatedBalance(portfolio.getAllocatedBalance().subtract(amount));
        ruleService.setStopLossInitialValue(portfolio.getRule(), portfolio.getCurrentValue());
        save(portfolio);
    }

}
