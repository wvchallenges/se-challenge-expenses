package com.wavech.expense.service;

import com.wavech.expense.dao.FileDao;
import com.wavech.expense.domain.Transaction;
import com.wavech.expense.exception.ExpenseReportException;
import com.wavech.expense.handlers.FileType;
import com.wavech.expense.handlers.IFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.List;

@Service
public class FileServiceImpl implements  FileService {

    FileDao fileDao;

    @Override
    @Transactional
    public void saveExpenseFile(InputStream inputStream, FileType type) throws ExpenseReportException {

        List<Transaction> transactionList = type.getIFormatter().format(inputStream);
        fileDao.saveFile(transactionList);

    }

    @Autowired
    public void setFileDao(FileDao fileDao) {
        this.fileDao = fileDao;
    }
}
