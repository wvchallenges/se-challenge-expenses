package com.tannerrutgers.sechallenge.application.service;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import com.tannerrutgers.sechallenge.application.repository.EmployeeExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

/**
 * Service class for handling EmployeeExpense entities
 */
@Service
public class EmployeeExpenseService {

    @Inject
    private EmployeeExpenseRepository employeeExpenseRepository;

    @Transactional
    public void createExpenses(List<EmployeeExpenseEntity> expenses) {
        if (expenses != null) {
            employeeExpenseRepository.save(expenses);
        }
    }
}
