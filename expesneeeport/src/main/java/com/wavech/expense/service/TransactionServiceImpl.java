package com.wavech.expense.service;

import com.wavech.expense.dao.TransactionDao;
import com.wavech.expense.domain.MonthReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    private static final String MONTHS[] = {"January","February","March", "April","May","June","July","August","September","October","November","December"};

    private TransactionDao transactionDao;

    public List<MonthReport> getMonthReport() {
        List<MonthReport> data = transactionDao.getMonthReport();
        //Need to create emtry dat for the graph to render if there are no records for certain months.
        List<String> strings = Arrays.stream(MONTHS).collect(Collectors.toList());
        data.stream().forEach(d -> strings.remove(d.getMonth()));
        strings.stream().forEach(x -> data.add(new MonthReport(x, 0.0, 0.0)));
        return data;
    }

    @Autowired
    public void setTransactionDao(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }
}
