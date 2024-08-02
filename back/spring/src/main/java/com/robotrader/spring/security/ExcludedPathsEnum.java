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
    TRADING_PREDICTION("/api/v1/admin/trading/prediction");

    private final String path;
}