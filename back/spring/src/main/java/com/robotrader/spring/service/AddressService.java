package com.robotrader.spring.service;

import com.robotrader.spring.dto.address.AddressDTO;
import com.robotrader.spring.exception.notFound.AddressNotFoundException;
import com.robotrader.spring.model.Address;
import com.robotrader.spring.repository.AddressRepository;
import com.robotrader.spring.service.interfaces.IAddressService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class AddressService implements IAddressService {

    private final AddressRepository addressRepository;
    private final CustomerService customerService;

    @Autowired
    public AddressService(AddressRepository addressRepository, @Lazy CustomerService customerService) {
        this.addressRepository = addressRepository;
        this.customerService = customerService;
    }

    @Override
    @Transactional
    public void save(Address address) {
        addressRepository.save(address);
    }

    @Override
    @Transactional
    public void create(Address address) {
        addressRepository.save(address);
    }

    @Override
    @Transactional
    public Address create(AddressDTO addressDTO) {
        Address address = new Address();
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCountry(addressDTO.getCountry());
        address.setUnitNo(addressDTO.getUnitNo());
        create(address);
        return address;
    }

    @Override
    public Address getAddressByUsername(String username) {
        Address address = customerService.getCustomerByUsername(username).getAddress();
        if (address == null) {
            throw new AddressNotFoundException("Address not found");
        }
        return address;
    }

    @Override
    public AddressDTO getAddressDTOByUsername(String username) {
        Address address = getAddressByUsername(username);
        return new AddressDTO(address.getStreet(), address.getCity(),
                address.getPostalCode(), address.getCountry(), address.getUnitNo());
    }

    @Override
    @Transactional
    public AddressDTO update(String username, AddressDTO addressDTO) {
        Address address = getAddressByUsername(username);
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCountry(addressDTO.getCountry());
        address.setUnitNo(addressDTO.getUnitNo());

        save(address);
        return addressDTO;
    }

}
