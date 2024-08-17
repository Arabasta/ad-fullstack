package com.robotrader.spring.stopLossEvent;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.service.interfaces.IPortfolioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

class StopLossTriggeredListenerTest {

    @Mock
    private IPortfolioService portfolioService;

    private StopLossTriggeredListener stopLossTriggeredListener;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        stopLossTriggeredListener = new StopLossTriggeredListener(portfolioService);
    }

    @Test
    void testHandleStopLossTriggered() {
        Portfolio portfolio = new Portfolio();
        StopLossTriggeredEvent event = new StopLossTriggeredEvent(this, portfolio);

        stopLossTriggeredListener.handleStopLossTriggered(event);

        ArgumentCaptor<Portfolio> portfolioCaptor = ArgumentCaptor.forClass(Portfolio.class);
        verify(portfolioService).handleStopLoss(portfolioCaptor.capture());

        Portfolio capturedPortfolio = portfolioCaptor.getValue();
        assertEquals(portfolio, capturedPortfolio, "The portfolio doenst mathc");
    }
}
