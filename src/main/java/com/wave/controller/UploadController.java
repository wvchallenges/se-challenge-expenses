package com.wave.controller;

import com.wave.models.Expense;
import com.wave.models.ExpenseDao;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.MessageSource;

@Controller
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);
//    private static final String [] FILE_HEADER_MAPPING = {"date","category","employee name","employee address","expense description","pre-tax amount","tax name","tax amount"};

    @Autowired
    ExpenseDao expenseDao;

    @Autowired
    private MessageSource messageSource;



    @GetMapping("/")
    public String index() {
        return "upload";
    }

    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }
        try {
            logger.info("UploadController", "Processing file " + file.getOriginalFilename());
            byte[] bytes = file.getBytes();
            CSVParser parser = new CSVParser(new StringReader(new String(bytes)), CSVFormat.DEFAULT);
            List<CSVRecord> records = parser.getRecords();
            logger.info("UploadController", "Found  " + records.size() + " records.");
            for (int i = 1; i < records.size(); i++) {
                CSVRecord record = records.get(i);
                try {
                    Expense expense = new Expense(record);
                    expenseDao.save(expense);
                } catch (Exception e) {
                    String message = "Error parsing line " + i + " of file " + file.getName() + " " + e.getMessage();
                    logger.error("UploadController", message);
                    redirectAttributes.addFlashAttribute("message",
                            message);

                }
            }
            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            logger.error("UploadController", e);
        }
        return "redirect:/uploadResult";
    }

    @GetMapping("/uploadResult")
    public String uploadStatus() {
        return "uploadResult";
    }

}