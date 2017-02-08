package com.wave.models;

import org.apache.commons.csv.CSVRecord;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "expense")
public class Expense {
    static SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
    @NotNull
    long insertId;
    @NotNull
    Date expenseDate;
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
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public Expense(long id, CSVRecord record) throws ParseException, NumberFormatException {
        insertId = id;
        expenseDate = format.parse(record.get(0));
        category = record.get(1);
        employeeName = record.get(2);

        employeeAddress = record.get(3);
        expenseDescription = record.get(4);
        preTaxAmount = new BigDecimal(record.get(5).trim().replace(",", ""));
        taxName = record.get(6);
        taxAmount = new BigDecimal(record.get(7).trim().replace(",", ""));
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getInsertId() {
        return insertId;
    }

    public void setInsertId(long insertId) {
        this.insertId = insertId;
    }

    public Date getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(Date expenseDate) {
        this.expenseDate = expenseDate;
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
