package com.wavech.expense.service;

import com.wavech.expense.dao.TransactionDao;
import com.wavech.expense.domain.MonthReport;

import java.util.List;

public interface TransactionService {


    public List<MonthReport> getMonthReport();
}
