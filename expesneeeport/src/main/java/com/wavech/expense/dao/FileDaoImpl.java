package com.wavech.expense.dao;

import com.wavech.expense.domain.Employee;
import com.wavech.expense.domain.Transaction;
import com.wavech.expense.handlers.FileType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FileDaoImpl implements  FileDao {


    public static final String INSERT_EMPLOYEE = "insert into employee (fname,lname,address1,city,state,zipcode) values (?, ?, ? ,?, ?, ?) ON DUPLICATE KEY UPDATE address1 = ? , city = ? , state = ? , zipcode = ?";
    private static final String INSERT_TRASCATION = "insert into transaction_rec (date, category, description,amount,taxName,taxAmount,type, emp_id) Select ? , ?, ?, ?, ?, ?, ? , id from employee where fname = ? and lname= ? ";
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void saveFile(List<Transaction> transaction) {
        for (Transaction transaction1 : transaction) {
            Employee employee = transaction1.getEmployee();
            jdbcTemplate.update(INSERT_EMPLOYEE, employee.getfName(),
                    employee.getlName(),
                    employee.getAddress().getAddress1(),
                    employee.getAddress().getCity(),
                    employee.getAddress().getState(),
                    employee.getAddress().getZipCode(),
                    employee.getAddress().getAddress1(),
                    employee.getAddress().getCity(),
                    employee.getAddress().getState(),
                    employee.getAddress().getZipCode());
            jdbcTemplate.update(INSERT_TRASCATION, transaction1.getDate(),
                    transaction1.getCategpory(),
                    transaction1.getDescription(),
                    transaction1.getAmount(),
                    transaction1.getTaxName(),
                    transaction1.getTaxAmount(),
                    FileType.CSV.ordinal(),
                    transaction1.getEmployee().getfName(),
                    transaction1.getEmployee().getlName());
        }

    }
}
