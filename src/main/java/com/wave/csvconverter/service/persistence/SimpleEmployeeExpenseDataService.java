package com.wave.csvconverter.service.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.wave.csvconverter.domain.EmployeeExpense;
import com.wave.csvconverter.domain.MonthlyExpense;
import com.wave.csvconverter.utils.persistence.MonthlyExpensesCalculator;

/*
 * The service manages access to the Employees' expenses table in the database
 */
@Service
public class SimpleEmployeeExpenseDataService implements EmployeeExpenseDataROService {
	private final JdbcTemplate jdbcTemplate;

	private static final Logger log = LoggerFactory.getLogger(SimpleEmployeeExpenseDataService.class);

	@Autowired
	public SimpleEmployeeExpenseDataService(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/*
	 * Retrieve all the table records
	 */
	public List<EmployeeExpense> getAllEmployeeExpenses() {
		log.info("Retrieveing all employees' expense records");
		List<EmployeeExpense> results = jdbcTemplate.query(
				"SELECT expense_date,category,employee_name,employee_address,expense_description,pretax_amount,tax_name,tax_amount FROM employee_expenses",
				new RowMapper<EmployeeExpense>() {
					@Override
					public EmployeeExpense mapRow(ResultSet rs, int row) throws SQLException {
						return new EmployeeExpense(rs.getDate(1), rs.getString(2), rs.getString(3), rs.getString(4),
								rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8));
					}
				});
		// For debugging purposes
		for (EmployeeExpense expense : results) {
			log.info("Returned employee expense record <" + expense + "> from the database.");
		}

		return results;
	}

	/*
	 * Return monthly expenses calculated using the helper utility class
	 */
	public List<MonthlyExpense> getTotalMonthlyExpenses() {
		List<EmployeeExpense> eployeeExpenses = getAllEmployeeExpenses();

		List<MonthlyExpense> results = new MonthlyExpensesCalculator().getTotalMonthlyExpenses(eployeeExpenses);
		// For debugging purposes
		for (MonthlyExpense monExpense : results) {
			log.info("Returned monthly expense data <" + monExpense + "> based on the database records.");
		}
		return results;
	}
}
