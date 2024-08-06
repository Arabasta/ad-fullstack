package com.robotrader.spring.trading.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PredictionDTOListDTO implements IPredictionServiceDTO {
    @NotNull
    private List<PredictionDTO> predictionDTOList;
}
