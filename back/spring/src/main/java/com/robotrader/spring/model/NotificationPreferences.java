package com.robotrader.spring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class NotificationPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean passwordChangeNotification = true;

    @Column(nullable = false)
    private Boolean stopLossNotification = true;

    @Column(nullable = false)
    private Boolean recurringDepositNotification = true;
}
