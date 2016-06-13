package com.tannerrutgers.sechallenge.application.model;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Basic model representing a tracked expense
 */
public class Expense implements Comparable<Expense> {

    private LocalDate date;
    private BigDecimal expense;

    public Expense(LocalDate date, BigDecimal expense) {
        this.date = date;
        this.expense = expense;
    }

    @Override
    public int compareTo(Expense other) {
        if (date == null) {
            if (other.getDate() == null) {
                return 0;
            } else {
                return -1;
            }
        } else {
            if (other.getDate() == null) {
                return 1;
            } else {
                return date.compareTo(other.getDate());
            }
        }
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getExpense() {
        return expense;
    }

    public void setExpense(BigDecimal expense) {
        this.expense = expense;
    }
}
