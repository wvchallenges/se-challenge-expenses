package com.wavech.expense.dao;

import com.wavech.expense.domain.Transaction;

import java.util.List;

public interface FileDao {

    void saveFile(List<Transaction> transaction);
}
