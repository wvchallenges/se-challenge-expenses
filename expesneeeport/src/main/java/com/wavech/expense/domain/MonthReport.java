package com.wavech.expense.domain;

public class MonthReport {

    public MonthReport() {

    }
    public MonthReport(String month, double totalTax, double total) {
        this.month = month;
        this.totalAmount = total;
        this.totalTaxAmount = totalTax;
    }
    private String month;

    private double totalTaxAmount;

    private double totalAmount;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getTotalTaxAmount() {
        return totalTaxAmount;
    }

    public void setTotalTaxAmount(double totalTaxAmount) {
        this.totalTaxAmount = totalTaxAmount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
