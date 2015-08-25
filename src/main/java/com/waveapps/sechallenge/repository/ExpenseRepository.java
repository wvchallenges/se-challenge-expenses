package com.waveapps.sechallenge.repository;

import org.springframework.data.repository.CrudRepository;

import com.waveapps.sechallenge.model.Expense;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {
    
}