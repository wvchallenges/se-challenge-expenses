package ca.datasports.wavechallenge.data;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class DataEntityCollection<T extends DataEntityBase> {
	private Map<String, T> _collection = new HashMap<>();
	
	public T registerItem(T item)
	{
		if (_collection.containsKey(item.getKey()))
		{
			return _collection.get(item.getKey());
		}
		else
		{
			_collection.put(item.getKey(), item);
			return item;
		}
	}
	
	public T getByDbId(int id)
	{
		for (T curItem : _collection.values())
		{
			if (curItem.getDbId() == id)
			{
				return curItem;
			}
		}
		
		return null;
	}
	
	public List<T> getUncommitted()
	{
		List<T> result = new LinkedList<>();
		for (T curItem : _collection.values())
		{
			if (curItem.getDbId() == DataEntityBase.NO_DB_ID)
			{
				result.add(curItem);
			}
		}
		
		return result;
	}
}
