package com.wave.expenses;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String category;
    private String employeeName;
    private String employeeAddress;
    private String expenseDescription;
    private String taxName;
    private Double amountPreTax;
    private Double amountTax;

    @JsonIgnore
    private Date date;
    @JsonIgnore
    private Double amountIncludingTax;

    @Transient
    private String dateString;

    public Expense() {
    }

    public Expense(Date date, String category, String employeeName, String employeeAddress, String expenseDescription, String taxName, Double amountPreTax, Double amountTax, Double amountIncludingTax) {
        this.date = date;
        this.category = category;
        this.employeeName = employeeName;
        this.employeeAddress = employeeAddress;
        this.expenseDescription = expenseDescription;
        this.taxName = taxName;
        this.amountPreTax = amountPreTax;
        this.amountTax = amountTax;
        this.amountIncludingTax = amountIncludingTax;
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

    public String getTaxName() {
        return taxName;
    }

    public void setTaxName(String taxName) {
        this.taxName = taxName;
    }

    public Double getAmountPreTax() {
        return amountPreTax;
    }

    public void setAmountPreTax(Double amountPreTax) {
        this.amountPreTax = amountPreTax;
    }

    public Double getAmountTax() {
        return amountTax;
    }

    public void setAmountTax(Double amountTax) {
        this.amountTax = amountTax;
    }

    public Double getAmountIncludingTax() {
        return amountIncludingTax;
    }

    public void setAmountIncludingTax(Double amountIncludingTax) {
        this.amountIncludingTax = amountIncludingTax;
    }

    public String getDateString() { return dateString; }

    public void setDateString(String dateString) { this.dateString = dateString; }

    public void setComputedData() throws ParseException {

        // Date
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        java.util.Date javaDate = sdf.parse(getDateString());
        java.sql.Date sqlDate = new Date(javaDate.getTime());
        setDate(sqlDate);

        // Amount including tax
        setAmountIncludingTax(getAmountPreTax() + getAmountTax());
    }

}
