package com.robotrader.spring.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtil {
    public static ZonedDateTime convertTimestampToZonedDateTime(Long timestamp) {
        Instant i = Instant.ofEpochSecond(timestamp);
        ZoneId sgZone = ZoneId.of("Asia/Singapore");
        return ZonedDateTime.ofInstant(i, sgZone);
    }
}
