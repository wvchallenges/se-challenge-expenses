package com.wavech.expense.domain;

public enum TransactionType {
    Expense(1);

    private int index;
    TransactionType(int index) {
        this.index = index;
    }

    public int getIndex() {
        return index;
    }
}
