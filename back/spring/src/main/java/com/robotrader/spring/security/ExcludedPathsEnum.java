package com.robotrader.spring.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExcludedPathsEnum {
    HEALTH("/api/v1/health"),
    LOGIN("/api/v1/auth/login"),
    REGISTER("/api/v1/auth/register"),
    DEVAWSWIPETX("/api/v1/devAws/wipe-tx"),
    //todo: /trading/ and /prediction/ paths used for API debugging. delete before submission if not needed.
    PREDICTION_PREDICT_TICKERS("/api/v1/admin/prediction/predict"),
    PREDICTION_AVAILABLE_TICKERS("/api/v1/admin/prediction/available"),
    PREDICTION_TICKER_LIVE("/api/v1/admin/prediction/ticker/live"),
    PREDICTION_TICKER_LIST_LIVE("/api/v1/admin/prediction/ticker_list/live");
    private final String path;
}