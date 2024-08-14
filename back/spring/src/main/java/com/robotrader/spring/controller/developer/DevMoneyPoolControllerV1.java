package com.robotrader.spring.controller.developer;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.moneyPool.MoneyPoolDTO;
import com.robotrader.spring.model.MoneyPool;
import com.robotrader.spring.service.interfaces.IMoneyPoolService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for seeding Money Pool
 * This controller is only for development and submission purposes
 * It is not part of the final product, only for markers to test the application
 *
 */
@RestController
@RequestMapping("/api/v1/dev/moneypool")
public class DevMoneyPoolControllerV1 {
    private final IMoneyPoolService moneyPoolService;

    @Autowired
    public DevMoneyPoolControllerV1(IMoneyPoolService moneyPoolService) {
        this.moneyPoolService = moneyPoolService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<MoneyPool>> addMoneyPool(@Valid @RequestBody MoneyPoolDTO moneyPoolDTO) {
        MoneyPool moneyPool = moneyPoolService.create(moneyPoolDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Money Pool created successfully", moneyPool));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<MoneyPoolDTO>> updateMoneyPool(@Valid @RequestBody MoneyPoolDTO moneyPoolDTO) {
        MoneyPoolDTO updatedMoneyPoolDTO = moneyPoolService.updateMoneyPool(moneyPoolDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Money Pool updated successfully", updatedMoneyPoolDTO));
    }
}
