package ca.datasports.wavechallenge.data;

public abstract class DataEntityBase {
	
	public static final String NO_OBJECT_KEY = "";
	public static final int NO_DB_ID = -1;
	
	protected String _objectKey = NO_OBJECT_KEY;
	protected int _dbId = NO_DB_ID;

	public String getKey()
	{
		return _objectKey;
	}
	
	public int getDbId()
	{
		return _dbId;
	}
	
	public void setDbId(int dbId)
	{
		_dbId = dbId;
	}
}
