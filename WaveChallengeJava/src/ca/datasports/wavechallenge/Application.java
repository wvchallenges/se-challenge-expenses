package ca.datasports.wavechallenge;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import ca.datasports.wavechallenge.data.Expense;
import ca.datasports.wavechallenge.data.ExpenseReport;
import ca.datasports.wavechallenge.persistence.DBReader;
import ca.datasports.wavechallenge.persistence.DBWriter;
import ca.datasports.wavechallenge.persistence.DBSchema;
import ca.datasports.wavechallenge.persistence.ExpenseFileParser;
import ca.datasports.wavechallenge.reporting.MonthSummary;
import ca.datasports.wavechallenge.reporting.MonthlyBreakdown;

public class Application {

	private static boolean _verbose = true;
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	
	public static void main(String[] args) {

		
		if ((args.length < 4) || (args.length > 5))
		{
			System.out.println("usage: wavechallenge verbose dbUrl dbUser dbPassword <filename>");
			System.out.println("reads from stdin if <filename> is not specified.");
			
			return;
		}
		
		try 
		{
			String dbUrl;
			String dbUser;
			String dbPassword;

			ExpenseReport report = new ExpenseReport();
			ExpenseFileParser fileParser = new ExpenseFileParser();

			_verbose = Boolean.valueOf(args[0]).booleanValue();
			dbUrl = args[1];
			dbUser = args[2];
			dbPassword = args[3];

			DBSchema schema = new DBSchema(DRIVER_CLASS_NAME, dbUrl, dbUser, dbPassword);
			
			DBReader reader = new DBReader(schema);
			report = reader.fetchFromDB(report);
			
			dumpReport(report, "After fetch from DB");
			
			if (args.length == 4)
			{
				BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in));
				String curLine;
				StringBuilder consoleInput = new StringBuilder();
				while (((curLine = stdin.readLine()) != null) && (curLine.length() > 0))
				{
					consoleInput.append(curLine);
					consoleInput.append(System.lineSeparator());
				}
				
				report = fileParser.parseFromFileContents(report, consoleInput.toString());
			}
			else if (args.length == 5)
			{
				report = fileParser.parseFromFileName(report, args[4]);
			}

			dumpReport(report, "Before saving to DB");
			
			DBWriter writer = new DBWriter(schema);
			report = writer.commitToDb(report);
			
			schema.CloseConnection();

			dumpReport(report, "After saving to DB");
			
			for (MonthSummary curMonth : MonthlyBreakdown.GetMonthlySummary(report))
			{
				System.out.println(curMonth.toString());
			}
			
		} catch (Exception ex) {

			ex.printStackTrace();
		}
		

	}

	private static void dumpReport(ExpenseReport report, String preface)
	{
		if (_verbose)
		{
			System.out.println(preface);
			
			for (Expense curExpense : report.getExpenses())
			{
				System.out.println(curExpense.toString());
			}
		}
	}
}
