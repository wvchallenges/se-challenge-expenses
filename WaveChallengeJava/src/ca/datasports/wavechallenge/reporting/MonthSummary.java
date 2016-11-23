package ca.datasports.wavechallenge.reporting;

import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

public class MonthSummary {
	private int _year;
	private int _month;
	private Double _spending;
	
	public MonthSummary(Date date, Double spending)
	{
		Calendar cal = new GregorianCalendar();
		
		cal.setTime(date);
		_year = cal.get(Calendar.YEAR);
		_month = cal.get(Calendar.MONTH) + 1;
		
		_spending = spending;
	}
	
	public String getKey()
	{
		return String.format("%4d/%02d", _year, _month); 
	}
	
	public void add(MonthSummary x) throws Exception
	{
		if ((this._year == x._year) && (this._month == x._month))
		{
			this._spending += x._spending;
		}
		else
		{
			throw new Exception("addition not allowed for mismatched dates");
		}
	}
	
	public String toString()
	{
		return String.format(
			"Spending for %4d/%02d: %s", _year, _month, 
			NumberFormat.getCurrencyInstance(new Locale("en", "CA")).format(_spending)
		);
	}
}
