package com.waveapps.sechallenge.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UploadFileController {

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
            	
	                byte[] bytes = file.getBytes();
	                BufferedOutputStream stream =
	                        new BufferedOutputStream(new FileOutputStream(new File("c:\\CustomInstalls\\test.csv")));
	                stream.write(bytes);
	                stream.close();
	                message = "You have successfully uploaded the file!";
	                
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