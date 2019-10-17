package com.waveapps.sechallenge.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.waveapps.sechallenge.model.Tax;

public interface TaxRepository extends CrudRepository<Tax, Long> {

    List<Tax> findByName(String name);
    
}