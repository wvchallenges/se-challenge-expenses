package com.kenan.wave.webapp.service.data;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.kenan.wave.webapp.service.ExpenseItem;
import com.kenan.wave.webapp.service.SummaryItem;

public class MySqlStorage implements ExpenseStorage {
	Logger LOGGER = Logger.getLogger(MySqlStorage.class);

	private static final String DB_DRIVER = "com.mysql.jdbc.Driver";
	private static final String DB_CONNECTION = "jdbc:mysql://localhost/wave";
	private static final String DB_USER = "root";
	private static final String DB_PASSWORD = "password";

	public MySqlStorage() {
		LOGGER.info("DB_CONNECTION = jdbc:mysql://localhost/wave");
	}
	@Override
	public List<SummaryItem> retrieveSummaryExpenses() throws SQLException {
		Connection dbConnection = null;
		Statement statement = null;

		List<SummaryItem> summary = new ArrayList<SummaryItem>();
		String sqlSelectExpenses = "SELECT YEAR(expense_date) as year, MONTH(expense_date) as month, SUM(pre_tax_amount) as sum FROM expenses GROUP BY YEAR(expense_date), MONTH(expense_date)";
		try {
			dbConnection = getDBConnection();
			statement = dbConnection.createStatement();
			ResultSet rs = statement.executeQuery(sqlSelectExpenses);

			// iterate through the resultset
			while (rs.next()) {
				SummaryItem item = new SummaryItem();
				item.setMonth(rs.getString("month"));
				item.setYear(rs.getString("year"));
				item.setTotal(rs.getBigDecimal("sum"));
				
				System.out.println(item.toString());
				summary.add(item);
			}

		} catch (SQLException | ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			if (statement != null) {
				statement.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
		return summary;
	}
	@Override
	public List<ExpenseItem> retrieveAllExpenses() throws SQLException {
		Connection dbConnection = null;
		Statement statement = null;

		List<ExpenseItem> expenses = new ArrayList<ExpenseItem>();
		String sqlSelectExpenses = "SELECT * FROM expenses";
		try {
			dbConnection = getDBConnection();
			statement = dbConnection.createStatement();
			ResultSet rs = statement.executeQuery(sqlSelectExpenses);

			// iterate through the resultset
			while (rs.next()) {
				ExpenseItem item = new ExpenseItem();
				item.setDate(rs.getDate("EXPENSE_DATE"));
				item.setCategory(rs.getString("CATEGORY"));
				item.setEmpName(rs.getString("EMP_NAME"));
				item.setEmpAddress(rs.getString("EMP_ADDRESS"));
				item.setDesc(rs.getString("EXPENSE_DESC"));
				item.setPretax(rs.getBigDecimal("PRE_TAX_AMOUNT"));
				item.setTaxName(rs.getString("TAX_NAME"));
				item.setTaxAmount(rs.getBigDecimal("TAX_AMOUNT"));
				System.out.println(item.toString());
				expenses.add(item);
			}

		} catch (SQLException | ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			if (statement != null) {
				statement.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
		return expenses;
	}
	
	@Override
	public void insertExpenses(List<ExpenseItem> expenses) throws SQLException {
		Connection dbConnection = null;
		PreparedStatement expensePreparedStatement = null;
		String insertQuery = "INSERT  INTO  expenses ( EXPENSE_DATE, CATEGORY,EMP_NAME, EMP_ADDRESS, EXPENSE_DESC,PRE_TAX_AMOUNT, TAX_NAME, TAX_AMOUNT)  VALUES  (?,?,?,?,?,?,?,?)";
		try {
			dbConnection = getDBConnection();
			for (ExpenseItem expense : expenses) {
				expensePreparedStatement = dbConnection
						.prepareStatement(insertQuery);
				expensePreparedStatement.setDate(1, expense.getDate());
				expensePreparedStatement.setString(2, expense.getCategory());
				expensePreparedStatement.setString(3, expense.getEmpName());
				expensePreparedStatement.setString(4, expense.getEmpAddress());
				expensePreparedStatement.setString(5, expense.getDesc());
				expensePreparedStatement.setBigDecimal(6, expense.getPretax());
				expensePreparedStatement.setString(7, expense.getTaxName());
				expensePreparedStatement.setBigDecimal(8, expense.getTaxAmount());
	
				// execute insert SQL statement
				expensePreparedStatement.executeUpdate();
			}
		} catch (SQLException | ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			if (expensePreparedStatement != null) {
				expensePreparedStatement.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
	}
	@Override
	public void insertExpense(ExpenseItem expense) throws SQLException {
		Connection dbConnection = null;
		PreparedStatement expensePreparedStatement = null;
		String insertQuery = "INSERT  INTO  expenses ( EXPENSE_DATE, CATEGORY,EMP_NAME, EMP_ADDRESS, EXPENSE_DESC,PRE_TAX_AMOUNT, TAX_NAME, TAX_AMOUNT)  VALUES  (?,?,?,?,?,?,?,?)";
		try {
			dbConnection = getDBConnection();

			expensePreparedStatement = dbConnection
					.prepareStatement(insertQuery);
			expensePreparedStatement.setDate(1, expense.getDate());
			expensePreparedStatement.setString(2, expense.getCategory());
			expensePreparedStatement.setString(3, expense.getEmpName());
			expensePreparedStatement.setString(4, expense.getEmpAddress());
			expensePreparedStatement.setString(5, expense.getDesc());
			expensePreparedStatement.setBigDecimal(6, expense.getPretax());
			expensePreparedStatement.setString(7, expense.getTaxName());
			expensePreparedStatement.setBigDecimal(8, expense.getTaxAmount());

			// execute insert SQL statement
			expensePreparedStatement.executeUpdate();
		} catch (SQLException | ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			if (expensePreparedStatement != null) {
				expensePreparedStatement.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
	}

	@Override
	public void createExpenseTable() throws SQLException {
		Connection dbConnection = null;
		Statement statement = null;

		String sqlDropTable = "DROP TABLE IF EXISTS expenses";
		String sqlCreateTable = "CREATE TABLE expenses("
				+ "EXPENSE_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, "
				+ "EXPENSE_DATE DATE NOT NULL, "
				+ "CATEGORY VARCHAR(50) NOT NULL, "
				+ "EMP_NAME VARCHAR(50) NOT NULL, "
				+ "EMP_ADDRESS VARCHAR(120) NOT NULL, "
				+ "EXPENSE_DESC VARCHAR(100) NOT NULL, "
				+ "PRE_TAX_AMOUNT NUMERIC(15,2) NOT NULL, "
				+ "TAX_NAME VARCHAR(20) NOT NULL, "
				+ "TAX_AMOUNT NUMERIC(15,2) NOT NULL " + ")";

		try {
			dbConnection = getDBConnection();
			statement = dbConnection.createStatement();
			statement.execute(sqlDropTable);
			statement.execute(sqlCreateTable);

			LOGGER.info("Table expense is created!");

		} catch (SQLException | ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
		} finally {
			if (statement != null) {
				statement.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
	}

	@Override
	public Connection getDBConnection() throws SQLException,
			ClassNotFoundException {
		Connection dbConnection = null;
		try {
			Class.forName(DB_DRIVER);
		} catch (ClassNotFoundException e) {
			LOGGER.error(e.getMessage(), e);
			throw e;
		}

		try {
			dbConnection = DriverManager.getConnection(DB_CONNECTION, DB_USER,
					DB_PASSWORD);
			return dbConnection;
		} catch (SQLException e) {
			LOGGER.error(e.getMessage(), e);
			throw e;
		}

	}

	public static void main(String[] argv) {
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		try {
			MySqlStorage db = new MySqlStorage();
			db.createExpenseTable();
			ExpenseItem item = new ExpenseItem(new java.sql.Date(df.parse(
					"02/18/2014").getTime()), "Travel", "Eric Schmidt",
					"1600 Amphitheatre Parkway, Mountain View, CA 94043",
					"Airplane ticket to NY", new BigDecimal("1500.00"),
					"CA Sales tax", new BigDecimal("112.50"));
			db.insertExpense(item);
			item.setDate(new java.sql.Date(df.parse("03/18/2014").getTime()));
			db.insertExpense(item);
			db.retrieveAllExpenses();
			db.retrieveSummaryExpenses();
		} catch (SQLException | ParseException e) {
			System.out.println(e.getMessage());
		}
	}

}
