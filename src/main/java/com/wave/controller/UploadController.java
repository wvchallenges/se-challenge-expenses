package com.wave.controller;

import com.wave.models.Expense;
import com.wave.models.ExpenseDao;
import com.wave.models.MonthlyExpense;
import com.wave.models.MonthlyExpenseRowMapper;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.context.MessageSource;

@Controller
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);
//    private static final String [] FILE_HEADER_MAPPING = {"date","category","employee name","employee address","expense description","pre-tax amount","tax name","tax amount"};

    @Autowired
    private ExpenseDao expenseDao;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private MessageSource messageSource;

    @Value("${sql.monthly_expenses}")
    private String sqlMonthlyExpense;

    @GetMapping("/")
    public String index() {
        return "upload";
    }



    @PostMapping("/upload")
    public String singleFileUpload(Model model, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", messageSource.getMessage("select.file", null, Locale.CANADA));
            return "redirect:uploadResult";
        }
        long id = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
        try {
            logger.info("UploadController", "Processing file " + file.getOriginalFilename() + " id for insert: " + id);
            byte[] bytes = file.getBytes();
            CSVParser parser = new CSVParser(new StringReader(new String(bytes)), CSVFormat.DEFAULT);
            List<CSVRecord> records = parser.getRecords();
            logger.info("UploadController", "Found  " + records.size() + " records.");
            int errorCount = 0;
            for (int i = 1; i < records.size(); i++) {
                CSVRecord record = records.get(i);
                try {
                    Expense expense = new Expense(id, record);
                    expenseDao.save(expense);
                } catch (Exception e) {
                    errorCount++;
                    String message = "Error parsing line " + i + " of file " + file.getOriginalFilename() + " " + e.getMessage();
                    logger.error("UploadController", message);
                    redirectAttributes.addFlashAttribute("error", message);
                }
            }
            redirectAttributes.addFlashAttribute("message",
                    "File '" + file.getOriginalFilename() + "' uploaded with " + errorCount + " errors.");
        } catch (IOException e) {
            logger.error("UploadController", e);
        }
        return "redirect:/uploadResult?id=" + id;
    }

    @GetMapping("/uploadResult")
    public ModelAndView uploadStatus(Model model, @RequestParam String id,
                                     RedirectAttributes redirectAttributes) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("id", id);
        List<MonthlyExpense> expenses = namedParameterJdbcTemplate.query(
                sqlMonthlyExpense, namedParameters, new MonthlyExpenseRowMapper());
        HashMap<String, Object> map = new HashMap<>();
        map.put("expenses", expenses);
        map.putAll(redirectAttributes.getFlashAttributes());
        return new ModelAndView("uploadResult", map);
    }

}