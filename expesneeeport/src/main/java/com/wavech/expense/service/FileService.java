package com.wavech.expense.service;

import com.wavech.expense.exception.ExpenseReportException;
import com.wavech.expense.handlers.FileType;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;

public interface FileService {

    void saveExpenseFile(InputStream inputStream, FileType type) throws ExpenseReportException;
}
