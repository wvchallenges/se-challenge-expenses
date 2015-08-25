package com.waveapps.sechallenge.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Employee {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String name;
	private String address;
	
	@OneToMany
	private List<Expense> expenses;
	
	public Employee() {}
	
	public Employee(int id, String name, String address, List<Expense> expenses) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.expenses = expenses;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Expense> getExpenses() {
		return expenses;
	}

	public void setExpenses(List<Expense> expenses) {
		this.expenses = expenses;
	}
	
	@Override
	public String toString() {
		String json = "{";
		
		json +=" \"id\":" + id + ",";
		json +=" \"name\":\"" + name + "\",";
		json +=" \"address\":\"" + address + "\" ";
		
		json += "}";
		return json;
	}
	
}
