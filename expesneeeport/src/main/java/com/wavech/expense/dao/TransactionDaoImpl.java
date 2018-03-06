package com.wavech.expense.dao;

import com.wavech.expense.domain.MonthReport;
import com.wavech.expense.domain.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionDaoImpl implements TransactionDao {

    public static final String SELECT_TRANSACTION = "Select  monthname(date), max(taxAmount) as totalTaxAmount, max(amount) as totalAmount from transaction_rec  group by monthname(date)";
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<MonthReport> getMonthReport() {
        return jdbcTemplate.query(SELECT_TRANSACTION,(rs, index) -> {
            int i = 1;
            MonthReport monthReport = new MonthReport();
            monthReport.setMonth(rs.getString(i++));
            monthReport.setTotalTaxAmount(rs.getDouble(i++));
            monthReport.setTotalAmount(rs.getDouble(i++));
            return monthReport;
        });
    }
}
