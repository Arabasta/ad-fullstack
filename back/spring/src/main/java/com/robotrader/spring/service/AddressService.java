package com.robotrader.spring.service;

import com.robotrader.spring.model.Address;
import com.robotrader.spring.repository.AddressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void save(Address address) {
        addressRepository.save(address);
    }

    @Transactional
    public Address initBaseAddress() {
        Address address = new Address();
        save(address);
        return address;
    }
}
