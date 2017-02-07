package com.wave.controller;

import com.wave.models.Expense;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
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

@Controller
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);
//    private static final String [] FILE_HEADER_MAPPING = {"date","category","employee name","employee address","expense description","pre-tax amount","tax name","tax amount"};

    static SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");

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
            byte[] bytes = file.getBytes();
            CSVParser parser = new CSVParser(new StringReader(String.valueOf(bytes)), CSVFormat.DEFAULT);
            List<CSVRecord> records = parser.getRecords();
            for (int i = 1; i < records.size(); i++) {
                CSVRecord record = records.get(i);
                Expense expense = fromRecord(record);

            }



            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            logger.error("UploadController", e);
        }
        return "redirect:/uploadStatus";
    }

    Expense fromRecord(CSVRecord record, int row) throws Exception {
        Expense expense = new Expense();
        try {
            expense.setDate(format.parse(record.get(0)));
        } catch (ParseException ex) {
            throw new Exception("Error at line " + row + " uparsable date: " + record.get(0));
        }
        expense.setCategory(record.get(1));
        expense.setEmployeeName(record.get(2));
        expense.setEmployeeAddress(record.get(3));
        expense.setCategory(record.get(1));
        expense.setCategory(record.get(1));
        expense.setCategory(record.get(1));
        expense.setCategory(record.get(1));

        return expense;
    }

    @GetMapping("/uploadStatus")
    public String uploadStatus() {
        return "uploadStatus";
    }

}