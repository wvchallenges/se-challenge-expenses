package com.tannerrutgers.sechallenge.application.repository;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA Repository for accessing EmployeeExpenseEntity
 */
@Repository
public interface EmployeeExpenseRepository extends CrudRepository<EmployeeExpenseEntity, Long> {
}
