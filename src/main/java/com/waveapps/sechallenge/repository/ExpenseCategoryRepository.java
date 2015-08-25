package com.waveapps.sechallenge.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.waveapps.sechallenge.model.ExpenseCategory;

public interface ExpenseCategoryRepository extends CrudRepository<ExpenseCategory, Long> {

    List<ExpenseCategory> findByDescription(String description);
    
}