package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.address.AddressDTO;
import com.robotrader.spring.model.Address;

public interface IAddressService {
    void save(Address address);
    Address create(AddressDTO addressDTO);
    Address getAddressByUsername(String username);
    AddressDTO getAddressDTOByUsername(String username);
    AddressDTO update(String username, AddressDTO addressDTO);
    void updateAddressFromDTO(Address address, AddressDTO addressDTO);
}
