package com.robotrader.spring.repository;

import com.robotrader.spring.model.NotificationPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationPreferencesRepository extends JpaRepository<NotificationPreferences, Long> {

}
