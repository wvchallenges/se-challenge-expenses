package com.wave.challenge.db;

import static org.junit.Assert.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeExpenseRepositoryTest {

  @Autowired
  private EmployeeExpenseRepository repository;

  @Test
  public void testWriteAndReadEntity() {
    EmployeeExpense employeeExpense1 = new EmployeeExpense(LocalDate.of(2017, 1, 1), "Hardware",
        "Phil", "123 Street St.", "Purchase new MacBook Pro", 2000.00, "CA Sales Tax", 2180.00);

    EmployeeExpense employeeExpense2 = new EmployeeExpense(LocalDate.of(2018, 1, 1), "Hardware",
        "Phil", "123 Street St.", "Purchase new mouse", 20.00, "CA Sales Tax", 21.80);

    EmployeeExpense employeeExpense3 = new EmployeeExpense(LocalDate.of(2017, 1, 5), "Hardware",
        "Fred", "123 Street St.", "Purchase new mouse", 20.00, "CA Sales Tax", 21.80);

    repository.save(employeeExpense1);
    repository.save(employeeExpense2);
    repository.save(employeeExpense3);

    List<EmployeeExpense> philsExpenses = repository.findByEmployeeName("Phil");
    assertEquals(2, philsExpenses.size());

    List<EmployeeExpense> fredsExpenses = repository.findByEmployeeName("Fred");
    assertEquals(1, fredsExpenses.size());

    List<EmployeeExpenseMonthlyReport> monthlyReports = repository.getMonthlyExpenseReport();

    EmployeeExpenseMonthlyReport jan2017 = monthlyReports.get(0);
    EmployeeExpenseMonthlyReport jan2018 = monthlyReports.get(1);
    assertEquals(Double.valueOf("2201.80"), jan2017.getSumTaxAmount());
    assertEquals(Double.valueOf("2020.00"), jan2017.getSumPreTaxAmount());
    assertEquals(Double.valueOf("21.80"), jan2018.getSumTaxAmount());
    assertEquals(Double.valueOf("20.00"), jan2018.getSumPreTaxAmount());
  }
}
