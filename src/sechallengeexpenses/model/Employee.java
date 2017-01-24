package sechallengeexpenses.model;

public class Employee {
	private String name = "";
	private String address = ""; // TODO: convert to its own object
	private int dbKey = -1;
	
	public static String sqlTableName = "EMPLOYEE";
	public static String sqlCreate = 
			"CREATE TABLE " + sqlTableName + " " +
            "(ID INTEGER PRIMARY KEY  AUTOINCREMENT," +
            " NAME           TEXT    NOT NULL, " + 
            " ADDRESS        CHAR(50)" + 
            " )"; 
	public static String sqlExist = "SELECT name FROM sqlite_master WHERE type='table' AND name='"+sqlTableName+"'";
	
	public Employee(String name, String address)
	{
		this.name = name;
		this.address = address;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getName()
	{
		return this.name;
	}
	
	public void setAddress(String address)
	{
		this.address = address;
	}
	
	public String getAddress()
	{
		return this.address;
	}
	
	public int getDbKey() {
		return dbKey;
	}

	public void setDbKey(int dbKey) {
		this.dbKey = dbKey;
	}

	public String insertStatement()
	{
		if( this.name == null || this.address == null )
		{
			return null;
		}
		else
		{
			return "INSERT INTO " + Employee.sqlTableName + " (NAME,ADDRESS) VALUES (\""+this.name+"\",\""+this.address+"\")";
		}
	}
	
	public String findStatement() {
		return "SELECT * FROM " + sqlTableName + " WHERE NAME=\"" + this.name + "\"";
	}
	
	public static String selectAllStatement()
	{
		return "SELECT * FROM " + Employee.sqlTableName;
	}
	
}
