package com.waveapps.sechallenge.controller;

import java.util.List;

import com.waveapps.sechallenge.model.TotalByMonthQueryResult;

public class UploadRESTResponse {

	private String message;
	private boolean isError;
	private List<TotalByMonthQueryResult> totals;
	
	public UploadRESTResponse() {}
	
	public UploadRESTResponse(String message, boolean isError, List<TotalByMonthQueryResult> totals) {
		super();
		this.message = message;
		this.isError = isError;
		this.totals = totals;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isError() {
		return isError;
	}
	public void setError(boolean isError) {
		this.isError = isError;
	}
	public List<TotalByMonthQueryResult> getTotals() {
		return totals;
	}
	public void setTotals(List<TotalByMonthQueryResult> totals) {
		this.totals = totals;
	}
	
}
