package com.waveapps.sechallenge.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.waveapps.sechallenge.model.Employee;
import com.waveapps.sechallenge.model.Expense;
import com.waveapps.sechallenge.model.ExpenseCategory;
import com.waveapps.sechallenge.model.Tax;

@Component
public class RepositoryUtils {

	@Autowired
	private TaxRepository taxRepo;
	@Autowired
	private ExpenseCategoryRepository expenseCategoryRepo;
	@Autowired
	private EmployeeRepository employeeRepo;
	@Autowired
	private ExpenseRepository expenseRepo;
	
	public void saveAll(List<Expense> expenses) {
		if(expenses != null) {
			for(Expense ex : expenses) {
				//retieving or saving tax obj
				List<Tax> tList = taxRepo.findByName(ex.getTax().getName());
				if(tList != null && tList.size() > 0) {
					ex.setTax(tList.get(0));
				} else {
					taxRepo.save(ex.getTax());
				}
				
				//retrieving or saving expense category obj
				List<ExpenseCategory> ecList = expenseCategoryRepo.findByDescription(ex.getCategory().getDescription());
				if(ecList != null && ecList.size() > 0) {
					ex.setCategory(ecList.get(0));
				} else {
					expenseCategoryRepo.save(ex.getCategory());
				}
				
				//retrieving or saving employee obj
				List<Employee> emList = employeeRepo.findByName(ex.getEmployee().getName());
				if(emList != null && emList.size() > 0) {
					ex.setEmployee(emList.get(0));
				} else {
					employeeRepo.save(ex.getEmployee());
				}
				
				//saving expense
				expenseRepo.save(ex);
			}
		}
		
	}
	
}
