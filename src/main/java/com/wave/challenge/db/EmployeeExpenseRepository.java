package com.wave.challenge.db;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface EmployeeExpenseRepository extends CrudRepository<EmployeeExpense, Long> {
  List<EmployeeExpense> findByEmployeeName(String name);

  @Query(value = "SELECT "
      + "NEW com.wave.challenge.db.EmployeeExpenseMonthlyReport(YEAR(view.date), MONTH(view.date), SUM(view.preTaxAmount), SUM(view.taxAmount)) "
      + "FROM EmployeeExpense view GROUP BY YEAR(view.date), MONTH(view.date) ORDER BY YEAR(view.date), MONTH(view.date)")
  List<EmployeeExpenseMonthlyReport> getMonthlyExpenseReport();
}
