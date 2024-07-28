package com.robotrader.spring.controller.customer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.rules.PortfolioRuleDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerDTO;
import com.robotrader.spring.dto.rules.ResetStopLossTriggerResponseDTO;
import com.robotrader.spring.model.enums.PortfolioTypeEnum;
import com.robotrader.spring.service.interfaces.IRuleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/rule")
public class RuleControllerV1 {

    private final IRuleService ruleService;

    @Autowired
    public RuleControllerV1(IRuleService ruleService) {
        this.ruleService = ruleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PortfolioRuleDTO>> getRules(Authentication authentication,
                                                                  @RequestParam PortfolioTypeEnum portfolioType) {
        String username = authentication.getName();
        PortfolioRuleDTO portfolioRuleDTO = ruleService.getRulesDTOByUsernameAndPortfolioType(username, portfolioType);
        return ResponseEntity.ok(new ApiResponse<>("success", "Rules retrieved successfully", portfolioRuleDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<PortfolioRuleDTO>> updateRules(Authentication authentication,
                                                                     @Valid @RequestBody PortfolioRuleDTO portfolioRuleDTO) {
        String username = authentication.getName();
        PortfolioRuleDTO updatedRuleDTO = ruleService.update(username, portfolioRuleDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Rules updated successfully", updatedRuleDTO));
    }

    @PostMapping("/reset-stop-loss")
    public ResponseEntity<ApiResponse<ResetStopLossTriggerResponseDTO>> resetStopLoss(Authentication authentication,
                                                                              @Valid @RequestBody ResetStopLossTriggerDTO resetStopLossTriggerDTO) {
        String username = authentication.getName();
        ResetStopLossTriggerResponseDTO resetTriggerResponseDTO = ruleService.resetStopLossTrigger(username, resetStopLossTriggerDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Stop loss trigger reset successfully", resetTriggerResponseDTO));
    }
}
