package com.wave.challenge.db;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class EmployeeExpense {
  @Id
  @GeneratedValue
  Long id;

  public EmployeeExpense() {}

  public EmployeeExpense(LocalDate date, String category, String employeeName, String employeeAddress,
      String expenseDescription, Double preTaxAmount, String taxName, Double taxAmount) {
    this.date = date;
    this.category = category;
    this.employeeName = employeeName;
    this.employeeAddress = employeeAddress;
    this.expenseDescription = expenseDescription;
    this.preTaxAmount = preTaxAmount;
    this.taxName = taxName;
    this.taxAmount = taxAmount;
  }

  @Column
  LocalDate date;
  @Column
  String category;
  @Column
  String employeeName;
  @Column
  String employeeAddress;
  @Column
  String expenseDescription;
  @Column
  Double preTaxAmount;
  @Column
  String taxName;
  @Column
  Double taxAmount;
}
