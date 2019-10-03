package com.wavech.expense.exception;

public class ExpenseReportException extends Exception {

    public ExpenseReportException(String message) {
        super(message);
    }

    public ExpenseReportException(String message, Throwable cause) {
        super(message, cause);
    }
}
