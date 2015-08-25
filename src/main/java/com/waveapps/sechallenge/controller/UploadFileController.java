package com.waveapps.sechallenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.waveapps.sechallenge.dataReader.DataReader;
import com.waveapps.sechallenge.dataReader.DataReaderFactory;
import com.waveapps.sechallenge.dataReader.DataReaderTypes;
import com.waveapps.sechallenge.model.Expense;
import com.waveapps.sechallenge.repository.ExpenseRepository;
import com.waveapps.sechallenge.repository.RepositoryUtils;

@Controller
public class UploadFileController {

	@Autowired
	private RepositoryUtils repositoryUtils;
	
	@Autowired
	private DataReaderFactory dataReaderFactory;
	
	@Autowired
	private ExpenseRepository expenseRepo;
	
	private String message;
	
	private boolean error = false;
	
    @RequestMapping("/UploadFile")
    public String init() {
        return "UploadFile.jsp";
    }
    
    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public ModelAndView handleFileUpload(@RequestParam("file") MultipartFile file){
    	
    	ModelAndView mav = new ModelAndView("UploadFile.jsp");
    	error = false;
    	
        if (!file.isEmpty()) {
            try {
            	
            	if(file.getOriginalFilename() != null && file.getOriginalFilename().contains(".csv")) {
            	
            		@SuppressWarnings("unchecked")
					DataReader<Expense> reader = (DataReader<Expense>) dataReaderFactory.getInstance(DataReaderTypes.CSV_EXPENSE);
	                List<Expense> expenses = reader.unmarshall(file);
            		
	                repositoryUtils.saveAll(expenses);
	                
	                Iterable<Expense> expensesFromDB = expenseRepo.findAll();
	                
	                for(Expense e : expensesFromDB) {
	                	System.out.println(e.toString());
	                }
	                
            		message = "The file has been successfully uploaded!";
	                
            	} else {
            		message = "Please upload a valid .csv file.";
            		error = true;
            	}
            } catch (Exception e) {
            	e.printStackTrace();
            	message = "The file upload failed. Please check the format fo your file and try again.";
            	error = true;
            }
        } else {
        	message = "The file seems to be empty. Please select a file and try again.";
        	error = true;
        }
        
        mav.addObject("message", message);
        mav.addObject("isError", error);
        
        return mav;
    }

}