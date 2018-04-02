package com.wave.challenge.db;

public class EmployeeExpenseMonthlyReport {

  private int year;
  private int month;
  private Double sumPreTaxAmount;
  private Double sumTaxAmount;
  private Double sumTotal;

  public EmployeeExpenseMonthlyReport(int year, int month, Double sumPreTaxAmount,
      Double sumTaxAmount) {
    this.year = year;
    this.month = month;
    this.sumPreTaxAmount = sumPreTaxAmount;
    this.sumTaxAmount = sumTaxAmount;
    this.sumTotal = sumPreTaxAmount + sumTaxAmount;
  }

  public int getYear() {
    return year;
  }

  public int getMonth() {
    return month;
  }

  public Double getSumPreTaxAmount() {
    return sumPreTaxAmount;
  }

  public Double getSumTaxAmount() {
    return sumTaxAmount;
  }

  public Double getSumTotal() {
    return sumTotal;
  }

}
