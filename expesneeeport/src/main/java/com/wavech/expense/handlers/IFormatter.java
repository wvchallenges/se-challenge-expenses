package com.wavech.expense.handlers;

import com.wavech.expense.exception.ExpenseReportException;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.List;

public interface IFormatter<T> {

    List<T> format(InputStream inputStream) throws ExpenseReportException;
}
