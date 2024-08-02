package com.robotrader.spring.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateTimeUtil {
    public static LocalDateTime convertTimestampToLocalDateTime(Long timestamp) {
        Instant i = Instant.ofEpochMilli(timestamp);
        ZoneId sgZone = ZoneId.of("Asia/Singapore");
        return LocalDateTime.ofInstant(i, sgZone);
    }
}
