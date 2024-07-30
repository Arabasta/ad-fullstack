package com.robotrader.spring.service;

import com.robotrader.spring.service.interfaces.ITradingApplicationService;
import com.robotrader.spring.trading.algorithm.TradingAlgorithmBaseOne;
import com.robotrader.spring.trading.algorithm.base.TradingAlgorithmBase;
import org.reflections.Reflections;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TradingApplicationService implements ITradingApplicationService {

    @Override
    public List<String> getAlgorithmList() {
        Reflections reflections = new Reflections("com.robotrader.spring.trading.algorithm");
        Set<Class<? extends TradingAlgorithmBase>> classes = reflections.getSubTypesOf(TradingAlgorithmBase.class);

        List<String> algorithmTypes = new ArrayList<>();
        for (Class<? extends TradingAlgorithmBase> clazz : classes) {
            try {
                Field field = clazz.getField("ALGORITHM_TYPE");
                String algorithmType = (String) field.get(null);
                algorithmTypes.add(algorithmType);
                System.out.println(clazz.getName() + ": " + algorithmType);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return algorithmTypes;
    }

}
