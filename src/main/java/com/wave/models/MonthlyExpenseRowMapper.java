package com.wave.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MonthlyExpenseRowMapper implements RowMapper<MonthlyExpense> {

    @Override
    public MonthlyExpense mapRow(ResultSet rs, int rowNum) throws SQLException {
        MonthlyExpense expense = new MonthlyExpense();
        expense.setInsertId(rs.getString("INSERT_ID"));
        expense.setYear(rs.getString("YEAR"));
        expense.setMonth(rs.getString("MONTH"));
        expense.setPreTaxAmount(rs.getBigDecimal("PRE_TAX_AMOUNT"));
        expense.setTaxAmount(rs.getBigDecimal("TAX_AMOUNT"));
        expense.setTotal(rs.getBigDecimal("TOTAL"));
        return expense;
    }
}
