package com.wavech.expense.dao;

import com.wavech.expense.domain.MonthReport;

import java.util.List;

public interface TransactionDao {

    public List<MonthReport> getMonthReport();

}
