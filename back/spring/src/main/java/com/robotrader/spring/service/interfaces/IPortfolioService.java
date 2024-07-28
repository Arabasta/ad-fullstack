package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.portfolio.PortfolioAllocateFundsDTO;
import com.robotrader.spring.dto.portfolio.PortfolioBalanceDTO;
import com.robotrader.spring.dto.portfolio.PortfolioTransactionResponseDTO;
import com.robotrader.spring.dto.portfolio.PortfolioWithdrawFundsDTO;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;

import java.math.BigDecimal;
import java.util.List;

public interface IPortfolioService {
    void save(Portfolio portfolio);
    List<Portfolio> getPortfolios();
    List<Portfolio> initBasePortfolios();
    List<Portfolio> getUserPortfolios(String username);
    Portfolio getPortfolioByUsernameAndType(String username, PortfolioTypeEnum portfolioType);
    PortfolioBalanceDTO getPortfolioDTOByUsernameAndType(String username, PortfolioTypeEnum portfolioType);
    PortfolioTransactionResponseDTO allocateFundsToPortfolio(String username, PortfolioAllocateFundsDTO portfolioAllocateFundsDTO);
    PortfolioTransactionResponseDTO withdrawFundsFromPortfolio(String username, PortfolioWithdrawFundsDTO portfolioWithdrawFundsDTO);
    void addFundsToPortfolio(Portfolio portfolio, BigDecimal amount);
    void removeFundsFromPortfolio(Portfolio portfolio, BigDecimal amount);
    void handleStopLoss(Portfolio portfolio);
    void stopLossWithdrawAllToWallet(Portfolio portfolio);
    void handleRecurringAllocation(Portfolio portfolio);
}
