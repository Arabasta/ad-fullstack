package com.robotrader.spring.stopLossEvent;

import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.context.ApplicationEventPublisher;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class StopLossEventPublisherTest {

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Mock
    private Portfolio portfolio;

    @Mock
    private Rule rule;

    private StopLossEventPublisher stopLossEventPublisher;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        stopLossEventPublisher = new StopLossEventPublisher(eventPublisher);
    }

    @Test
    void testEvaluateStopLossRules_StopLossTriggered() {
        when(portfolio.getRule()).thenReturn(rule);
        when(rule.getStopLossPercentage()).thenReturn(0.1);
        when(rule.getStopLossInitialValue()).thenReturn(BigDecimal.valueOf(1000));
        when(portfolio.getCurrentValue()).thenReturn(BigDecimal.valueOf(800));

        stopLossEventPublisher.evaluateStopLossRules(portfolio);

        ArgumentCaptor<StopLossTriggeredEvent> eventCaptor = ArgumentCaptor.forClass(StopLossTriggeredEvent.class);
        verify(eventPublisher).publishEvent(eventCaptor.capture());
        StopLossTriggeredEvent capturedEvent = eventCaptor.getValue();

        assertEquals(capturedEvent.getPortfolio(), portfolio);
    }

    @Test
    void testEvaluateStopLossRules_StopLossNotTriggered() {
        when(portfolio.getRule()).thenReturn(rule);
        when(rule.getStopLossPercentage()).thenReturn(0.1);
        when(rule.getStopLossInitialValue()).thenReturn(BigDecimal.valueOf(1000));
        when(portfolio.getCurrentValue()).thenReturn(BigDecimal.valueOf(950));

        stopLossEventPublisher.evaluateStopLossRules(portfolio);

        verify(eventPublisher, never()).publishEvent(any());
    }

    @Test
    void testEvaluateStopLossRules_NullRule() {
        when(portfolio.getRule()).thenReturn(null);

        stopLossEventPublisher.evaluateStopLossRules(portfolio);

        verify(eventPublisher, never()).publishEvent(any());
    }
}
