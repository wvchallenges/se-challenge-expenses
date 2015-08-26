package com.waveapps.sechallenge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.waveapps.sechallenge.dataReader.DataReaderFactory;
import com.waveapps.sechallenge.repository.ExpenseRepository;
import com.waveapps.sechallenge.repository.RepositoryUtils;

@Controller
public class UploadFileAngularController {

	@Autowired
	private RepositoryUtils repositoryUtils;
	
	@Autowired
	private DataReaderFactory dataReaderFactory;
	
	@Autowired
	private ExpenseRepository expenseRepo;
	
	@RequestMapping("/UploadFileAngular")
    public String initAngular() {
        return "UploadFileAngular.jsp";
    }

}