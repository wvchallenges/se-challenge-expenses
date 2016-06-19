package com.tannerrutgers.sechallenge.application.expenses;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA Repository for accessing EmployeeExpenseEntity
 */
@Repository
interface EmployeeExpenseRepository extends CrudRepository<EmployeeExpenseEntity, Long> {
}
