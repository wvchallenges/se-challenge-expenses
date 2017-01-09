package com.wave.expenses;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ExpenseRepository extends CrudRepository<Expense, Long> {

    @Query(value = "select YEAR(date) as y, MONTH(date) as m, sum(amount_including_tax) from expense group by y, m order by y, m", nativeQuery = true)
    public Object [] sumExpensesByMonth();

}
