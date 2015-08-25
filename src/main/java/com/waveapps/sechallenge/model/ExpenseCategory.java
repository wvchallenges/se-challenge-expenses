package com.waveapps.sechallenge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ExpenseCategory {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String description;
	
	public ExpenseCategory(){} 
	
	public ExpenseCategory(int id, String description) {
		super();
		this.id = id;
		this.description = description;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
		String json = "{";
		
		json +=" \"id\":" + id + ",";
		json +=" \"description\":\"" + description + "\" ";
		
		json += "}";
		return json;
	}
	
}
