package ca.datasports.wavechallenge.data;

public class ExpenseCategory extends DataEntityBase {
	private String _category;
	
	public ExpenseCategory(String category)
	{
		_category = category;
		_objectKey = category.toLowerCase();
	}
	
	public ExpenseCategory(int id, String category) {
		this(category);
		_dbId = id;
	}

	public String getCategory()
	{
		return _category;
	}
	
	
}
