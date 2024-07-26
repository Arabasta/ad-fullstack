package com.robotrader.spring.service;

import com.robotrader.spring.model.Wallet;
import com.robotrader.spring.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService {

    private final WalletRepository walletRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public void save(Wallet wallet) {
        walletRepository.save(wallet);
    }

    @Transactional
    public Wallet initBaseWallet() {
        Wallet wallet = new Wallet();
        save(wallet);
        return wallet;
    }

}
