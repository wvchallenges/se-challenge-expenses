package com.waveapps.sechallenge.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.waveapps.sechallenge.model.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    List<Employee> findByName(String name);
    
}