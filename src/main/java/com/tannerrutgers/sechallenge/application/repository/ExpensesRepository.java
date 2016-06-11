package com.tannerrutgers.sechallenge.application.repository;

import com.tannerrutgers.sechallenge.application.entity.ExpensesEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA Repository for accessing ExpensesEntity
 */
@Repository
public interface ExpensesRepository extends CrudRepository<ExpensesEntity, Long> {
}
