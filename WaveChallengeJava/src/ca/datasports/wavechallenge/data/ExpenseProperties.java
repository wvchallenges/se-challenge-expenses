package ca.datasports.wavechallenge.data;

import java.util.Date;

public class ExpenseProperties extends DataEntityBase {
	protected Date _date;
	protected String _description;
	protected Double _preTaxAmount;
	protected Double _taxAmount;
	

	public ExpenseProperties(Date date, String description, Double preTaxAmount,
			Double taxAmount) 
	{
		_date = date;
		_description = description;
		_preTaxAmount = preTaxAmount;
		_taxAmount = taxAmount;
	}
	
	public Date getDate()
	{
		return _date;
	}
	
	public String getDescription()
	{
		return _description;
	}
	
	public Double getPreTaxAmount()
	{
		return _preTaxAmount;
	}
	
	public Double getTaxAmount()
	{
		return _taxAmount;
	}

}
