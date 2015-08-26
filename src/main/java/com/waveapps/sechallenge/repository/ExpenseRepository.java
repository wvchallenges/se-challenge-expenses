package com.waveapps.sechallenge.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.waveapps.sechallenge.model.Expense;
import com.waveapps.sechallenge.model.TotalByMonthQueryResult;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {

	@Modifying
	@Query(
			"SELECT MONTH(e.date), YEAR(e.date), sum(e.preTaxAmount), sum(e.taxAmount) " +
			"FROM Expense e " +
			"GROUP BY MONTH(e.date), YEAR(e.date) " +
			"ORDER BY YEAR(e.date) DESC, MONTH(e.date) DESC"
	)
	public List<Object[]> getTotalByMonth();
	
	default List<TotalByMonthQueryResult> getTotalByMonthObjects(List<Object[]> queryResults) {
		List<TotalByMonthQueryResult> objResults = new ArrayList<TotalByMonthQueryResult>();
		
		for(Object[] result : queryResults) {
			objResults.add(new TotalByMonthQueryResult(result));
		}
		
		return objResults;
	}
	
}