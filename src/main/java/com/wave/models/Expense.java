package com.wave.models;

import org.apache.commons.csv.CSVRecord;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "expense")
public class Expense {
    static SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    Date date;

    @NotNull
    String category;

    @NotNull
    String employeeName;

    @NotNull
    String employeeAddress;

    @NotNull
    String expenseDescription;

    @NotNull
    BigDecimal preTaxAmount;

    @NotNull
    String taxName;

    @NotNull
    BigDecimal taxAmount;

    public Expense(CSVRecord record) throws ParseException, NumberFormatException {
        date = format.parse(record.get(0));
        category = record.get(1);
        employeeName = record.get(2);
        employeeAddress = record.get(3);
        expenseDescription = record.get(4);
        preTaxAmount = new BigDecimal(record.get(5).trim());
        taxName = record.get(6);
        taxAmount = new BigDecimal(record.get(7).trim());
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeAddress() {
        return employeeAddress;
    }

    public void setEmployeeAddress(String employeeAddress) {
        this.employeeAddress = employeeAddress;
    }

    public String getExpenseDescription() {
        return expenseDescription;
    }

    public void setExpenseDescription(String expenseDescription) {
        this.expenseDescription = expenseDescription;
    }

    public BigDecimal getPreTaxAmount() {
        return preTaxAmount;
    }

    public void setPreTaxAmount(BigDecimal preTaxAmount) {
        this.preTaxAmount = preTaxAmount;
    }

    public String getTaxName() {
        return taxName;
    }

    public void setTaxName(String taxName) {
        this.taxName = taxName;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

}
