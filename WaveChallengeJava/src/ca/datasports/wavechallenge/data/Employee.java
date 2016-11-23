package ca.datasports.wavechallenge.data;

public class Employee extends DataEntityBase {
	
	String _name;
	String _address;
	
	public Employee(String employeeName, String employeeAddress)
	{
		_name = employeeName;
		_address = employeeAddress;
		_objectKey = employeeName.toLowerCase() + "|" + employeeAddress.toLowerCase();
	}

	public Employee(int id, String employeeName, String employeeAddress)
	{
		this(employeeName, employeeAddress);
		_dbId = id;
	}
	
	public String getName()
	{
		return _name;
	}
	
	public String getAddress()
	{
		return _address;
	}
	

}
