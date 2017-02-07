package com.wave.models;

import org.springframework.data.repository.CrudRepository;
import javax.transaction.Transactional;

@Transactional
public interface ExpenseDao extends CrudRepository<Expense, Long> {
}