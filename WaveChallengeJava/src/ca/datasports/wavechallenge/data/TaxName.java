package ca.datasports.wavechallenge.data;

public class TaxName extends DataEntityBase {
	
	private String _taxName;
	
	public TaxName(String taxName)
	{
		_taxName = taxName;
		_objectKey = taxName.toLowerCase();
	}
	
	public TaxName(int id, String taxName) {
		this(taxName);
		_dbId = id;
	}

	public String getTaxName()
	{
		return _taxName;
	}

}
