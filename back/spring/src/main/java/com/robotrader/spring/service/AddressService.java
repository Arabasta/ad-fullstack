package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.AddressCreateDTO;
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

    @Transactional
    public void create(Address address) {
        addressRepository.save(address);
    }

    @Transactional
    public Address create(AddressCreateDTO addressCreateDTO) {
        Address address = new Address();
        address.setStreet(addressCreateDTO.getStreet());
        address.setCity(addressCreateDTO.getCity());
        address.setPostalCode(addressCreateDTO.getPostalCode());
        address.setCountry(addressCreateDTO.getCountry());
        address.setUnitNo(addressCreateDTO.getUnitNo());
        create(address);
        return address;
    }

    @Transactional
    public Address initBaseAddress() {
        Address address = new Address();
        create(address);
        return address;
    }


}
