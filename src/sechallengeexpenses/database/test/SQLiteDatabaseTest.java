package sechallengeexpenses.database.test;

import static org.junit.Assert.*;

import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import de.svenjacobs.loremipsum.LoremIpsum;
import sechallengeexpenses.database.SQLiteDatabase;
import sechallengeexpenses.model.Employee;
import sechallengeexpenses.model.Expense;
import sechallengeexpenses.model.SaleTax;
import sechallengeexpenses.sourcereader.CSVFileReader;

public class SQLiteDatabaseTest {

	SQLiteDatabase db = null;
	LoremIpsum loremIpsum = new LoremIpsum();
	
	@Before
	public void setUp() throws Exception {
		db = new SQLiteDatabase();
		db.connect(); 
	}

	@Test
	public void testInsertEmployee() {
		Statement stmt;
		try {
			stmt = db.getConnection().createStatement();
			String sql = "SELECT count(*) FROM " + Employee.sqlTableName; 
			ResultSet rs = stmt.executeQuery(sql);
			int before = 0;
			if(rs.next())
			{
				before = rs.getInt(1);
			}
			stmt.close();
			
			stmt = db.getConnection().createStatement();
			Employee thanh = new Employee(loremIpsum.getWords(2),loremIpsum.getWords(6));
			sql = thanh.insertStatement();
			stmt.executeUpdate(sql);
			stmt.close();
			
			stmt = db.getConnection().createStatement();
			sql = "SELECT count(*) FROM " + Employee.sqlTableName; 
			rs = stmt.executeQuery(sql); 
			int after = 0;
			if(rs.next())
			{
				after = rs.getInt(1);
			}
			stmt.close();
			
			assert( after - before == 1);
			
		} catch (SQLException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void testInsertSaleTax() {
		Statement stmt;
		try {
			stmt = db.getConnection().createStatement();
			String sql = "SELECT count(*) FROM " + SaleTax.sqlTableName; 
			ResultSet rs = stmt.executeQuery(sql);
			int before = 0;
			if(rs.next())
			{
				before = rs.getInt(1);
			}
			stmt.close();
			
			stmt = db.getConnection().createStatement();
			SaleTax saleTax = new SaleTax(loremIpsum.getWords(2),Math.random()*100);
			sql = saleTax.insertStatement();
			stmt.executeUpdate(sql);
			stmt.close();
			
			stmt = db.getConnection().createStatement();
			sql = "SELECT count(*) FROM " + SaleTax.sqlTableName; 
			rs = stmt.executeQuery(sql); 
			int after = 0;
			if(rs.next())
			{
				after = rs.getInt(1);
			}
			stmt.close();
			
			assert( after - before == 1);
			
		} catch (SQLException e) {
			e.printStackTrace();
			fail();
		}
	}
	

	@Test
	public void testInsertExpense() {
		Employee employee = new Employee("Thanh H. D. Nguyen", "4 Duncannon Cres., Brampton, ON, L6T 3G1");
		SaleTax saleTax = new SaleTax("ON HST", 13);
		Expense expense = new Expense(Calendar.getInstance().getTime(),loremIpsum.getWords(2), loremIpsum.getWords(6), Math.random()*100, employee, saleTax);
		db.insert(expense);
		System.out.println("EMPLOYER Table:");
		db.printAll(Employee.class);
		System.out.println("SALETAX Table:");
		db.printAll(SaleTax.class);
		System.out.println("EXPENSE Table:");
		db.printAll(Expense.class);
	}
	
	@Test
	public void testInsertExpensesFromCSV() {
		CSVFileReader reader = new CSVFileReader(new File("resource/data_example.csv"));
		
		List<Expense> expenses = reader.readFile();
		
		assert(expenses.size() == 19);
		
		Iterator<Expense> iter = expenses.iterator();
		
		while(iter.hasNext())
		{
			db.insert(iter.next());
		}
		
		System.out.println("EMPLOYER Table:");
		System.out.println(db.printAll(Employee.class));
		System.out.println("SALETAX Table:");
		System.out.println(db.printAll(SaleTax.class));
		System.out.println("EXPENSE Table:");
		System.out.println(db.printAll(Expense.class));
	}


}
