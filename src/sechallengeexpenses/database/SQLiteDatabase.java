package sechallengeexpenses.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

import sechallengeexpenses.model.Employee;
import sechallengeexpenses.model.Expense;
import sechallengeexpenses.model.SaleTax;

public class SQLiteDatabase implements IDatabase {
	private Connection c = null;
	
	@Override
	public void connect() {
		try {
			Class.forName("org.sqlite.JDBC");
			c = DriverManager.getConnection("jdbc:sqlite:test.db");
	      
			Statement stmtExist;
			String sqlExist;
			
			// Check if the Employee table exist and create one if not
			stmtExist = c.createStatement();
			sqlExist = Employee.sqlExist; 
			if(!stmtExist.executeQuery(sqlExist).next())
			{
				Statement stmtCreate = c.createStatement();
			    String sqlCreate = Employee.sqlCreate; 
			    stmtCreate.executeUpdate(sqlCreate);
			    stmtCreate.close();
			}
			else
			{
				System.out.println("Table " + Employee.sqlTableName + " exists.");
			}
			stmtExist.close();
			
			// Check if the Employee table exist and create one if not
			stmtExist = c.createStatement();
			sqlExist = SaleTax.sqlExist; 
			if(!stmtExist.executeQuery(sqlExist).next())
			{
				Statement stmtCreate = c.createStatement();
				String sqlCreate = SaleTax.sqlCreate; 
				stmtCreate.executeUpdate(sqlCreate);
				stmtCreate.close();
			}
			else
			{
				System.out.println("Table " + SaleTax.sqlTableName + " exists.");
			}
			stmtExist.close();
			
			// Check if the Employee table exist and create one if not
			stmtExist = c.createStatement();
			sqlExist = Expense.sqlExist; 
			if(!stmtExist.executeQuery(sqlExist).next())
			{
				Statement stmtCreate = c.createStatement();
				String sqlCreate = Expense.sqlCreate; 
				stmtCreate.executeUpdate(sqlCreate);
				stmtCreate.close();
			}
			else
			{
				System.out.println("Table " + Expense.sqlTableName + " exists.");
			}
			stmtExist.close();
			
		} catch ( Exception e ) {
	      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	      System.exit(0);
	    }
	    
	    System.out.println("Opened database successfully");
	}
	
	@Override
	public Connection getConnection() {
		return c;
	}

	@Override
	public int findEmployee(Employee employee) {
		int ret = -1;
		Statement stmt;
		String sql = employee.findStatement();
		try {
			stmt = getConnection().createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				ret = rs.getInt(1);
			}
			stmt.close();
		} catch (SQLException e) {
			return ret;
		}
				
		return ret;
	}

	@Override
	public int findSaleTax(SaleTax saleTax) {
		int ret = -1;
		Statement stmt;
		String sql = saleTax.findStatement();
		try {
			stmt = getConnection().createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				ret = rs.getInt(1);
			}
			stmt.close();
		} catch (SQLException e) {
			return ret;
		}
				
		return ret;
	}

	@Override
	public void insert(Employee employee) {
		Statement stmt;
		try {
			stmt = this.getConnection().createStatement();
			String sql = employee.insertStatement();
			stmt.executeUpdate(sql);
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void insert(SaleTax saleTax) {
		Statement stmt;
		try {
			stmt = this.getConnection().createStatement();
			String sql = saleTax.insertStatement();
			stmt.executeUpdate(sql);
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}	
	}
	
	@Override
	public void insert(Expense expense) {
		int employeeIndex = this.findEmployee(expense.getEmployee());
		if( employeeIndex < 0 )
		{
			this.insert(expense.getEmployee());
			employeeIndex =  this.findEmployee(expense.getEmployee());
		}
		expense.getEmployee().setDbKey(employeeIndex);
		
		int saleTaxIndex = this.findSaleTax(expense.getSaleTax());
		if( saleTaxIndex < 0 )
		{
			this.insert(expense.getSaleTax());
			saleTaxIndex = this.findSaleTax(expense.getSaleTax());
		}
		expense.getSaleTax().setDbKey(saleTaxIndex);
		
		Statement stmt;
		try {
			stmt = getConnection().createStatement();
			String sql = expense.insertStatement();
			if(sql != null)
			{
				stmt.executeUpdate(sql);
				stmt.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String printAll(Class classToPrint) {
		String ret = "";
		
		String sql;
		
		if(classToPrint.getName().compareTo(Expense.class.getName()) == 0)
		{
			sql = Expense.selectAllStatement();
		}
		else if(classToPrint.getName().compareTo(Employee.class.getName()) == 0)
		{
			sql = Employee.selectAllStatement();
		}
		else if(classToPrint.getName().compareTo(SaleTax.class.getName()) == 0)
		{
			sql = SaleTax.selectAllStatement();
		}
		else
		{
			return ret;
		}
		
		Statement stmt;
		try {
			stmt = getConnection().createStatement();
			
			ResultSet rs = stmt.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
				
			int columnsNumber = rsmd.getColumnCount();
			while(rs.next())
			{
				for (int i = 1; i <= columnsNumber; i++) {
					if (i > 1) 
					{
						ret = ret + ",  ";
					}
					String columnValue;
					if( rsmd.getColumnType(i) == Types.CHAR || rsmd.getColumnType(i) == Types.VARCHAR  )
					{
						columnValue = rs.getString(i);
					}
					else if(rsmd.getColumnType(i) == Types.INTEGER)
					{
						columnValue = String.valueOf(rs.getInt(i));
					}
					else if(rsmd.getColumnType(i) == Types.DOUBLE)
					{
						columnValue = String.valueOf(rs.getDouble(i));
					}
					else if(rsmd.getColumnType(i) == Types.DATE)
					{
						columnValue = rs.getDate(i).toString();
					}
					else
					{
						columnValue = "UNKNOW TYPE " + rsmd.getColumnType(i);
					}
				    ret = ret + rsmd.getColumnName(i) + ": " + columnValue;
				}
				ret = ret + "\n";
			}
			rs.close();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return ret;
	}
}
