package sechallengeexpenses.model;

public class SaleTax {
	private String name = "";
	private double percentage = 0;
	private int dbKey = -1;
	
	public static String sqlTableName = "SALETAX";
	public static String sqlCreate = 
			"CREATE TABLE " + sqlTableName + " " +
            "(ID INTEGER PRIMARY KEY  AUTOINCREMENT," +
            " NAME           TEXT    NOT NULL, " + 
            " PERCENTAGE     DOUBLE" + 
            " )"; 
	public static String sqlExist = "SELECT name FROM sqlite_master WHERE type='table' AND name='"+sqlTableName+"'";
	
	public SaleTax(String name, double d)
	{
		this.name = name;
		this.percentage = d;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getName()
	{
		return this.name;
	}
	
	public void setPercentage( float percentage)
	{
		this.percentage = percentage;
	}
	
	public double getPercentage()
	{
		return this.percentage;
	}
	
	public int getDbKey() {
		return dbKey;
	}

	public void setDbKey(int dbKey) {
		this.dbKey = dbKey;
	}
	
	public double calcuateTax(double amount)
	{
		return amount * this.percentage;
	}
	
	public String insertStatement()
	{
		return "INSERT INTO " + SaleTax.sqlTableName + " (NAME,PERCENTAGE) VALUES (\"" + this.name + "\",\"" + this.percentage + "\")";
	}

	public String findStatement() {
		return "SELECT * FROM " + sqlTableName + " WHERE NAME=\"" + this.name + "\"";
	}
	
	public static String selectAllStatement()
	{
		return "SELECT * FROM " + SaleTax.sqlTableName;
	}
}
