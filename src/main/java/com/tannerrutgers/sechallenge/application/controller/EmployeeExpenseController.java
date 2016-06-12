package com.tannerrutgers.sechallenge.application.controller;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import com.tannerrutgers.sechallenge.application.model.Expense;
import com.tannerrutgers.sechallenge.application.service.EmployeeExpenseService;
import com.tannerrutgers.sechallenge.application.util.csvparser.EmployeeExpenseCSVParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.inject.Inject;
import javax.ws.rs.QueryParam;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * MVC Controller for handling employee expenses
 */
@Controller
public class EmployeeExpenseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeExpenseController.class);

    private static final String CONTENT_TYPE_CSV = "text/csv";

    @Inject
    EmployeeExpenseService employeeExpenseService;
    @Inject
    EmployeeExpenseCSVParser employeeExpenseCSVParser;


    @RequestMapping(method = RequestMethod.GET, value="/employee-expenses")
    public String loadPage(@QueryParam("reset") boolean reset, Model model) {
        return "employee-expenses";
    }

    /**
     * Supports the upload and persistence of employee expenses by CSV
     * @param file MultipartFile representing uploaded CSV file
     * @param redirectAttributes Model attributes to be used after redirection
     * @return View to refresh or redirect
     */
    @RequestMapping(method = RequestMethod.POST, value = "/employee-expenses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadEmployeeExpensesFile(@RequestParam("file") MultipartFile file,
                                             RedirectAttributes redirectAttributes) {
        LOGGER.info("uploadEmployeeExpensesFile()");
        String message = null;
        String filename = file.getOriginalFilename();
        if (!file.isEmpty()) {
            if (CONTENT_TYPE_CSV.equals(file.getContentType())) {
                try {
                    List<EmployeeExpenseEntity> expenses = employeeExpenseCSVParser.parseCSVToEntities(file.getInputStream());
                    employeeExpenseService.createExpenses(expenses);
                    message = "Upload successful!";
                    redirectAttributes.addFlashAttribute("monthlyExpenses", getMonthlyExpenses(expenses));
                    LOGGER.info("uploadEmployeeExpensesFile successful");
                } catch (IOException|ParseException|IllegalArgumentException ex) {
                    message = "The uploaded file (" + filename + ") has unexpected content or cannot be parsed.";
                    LOGGER.info("uploadEmployeeExpensesFile failed", ex);
                } catch (DataAccessException ex) {
                    message = "There was an error saving employee expenses. Please try again.";
                    LOGGER.error("uploadEmployeeExpensesFile failed", ex);
                }
            } else {
                message = "The uploaded file (" + filename + ") is not a supported file type.";
                LOGGER.info("uploadEmployeeExpensesFile received unsupported file type: " + filename);
            }
        } else {
            message = "The uploaded file (" + filename + ") appears to be empty.";
            LOGGER.info("uploadEmployeeExpenseFile received empty file");
        }
        redirectAttributes.addFlashAttribute("message", message);
        return "redirect:/employee-expenses";
    }

    /**
     * Generates a list of Expense model objects from a list of Employee Expense entities
     * @param employeeExpenses List of employee expense entities from which to generate Expenses
     * @return List of Expenses
     */
    private List<Expense> getMonthlyExpenses(List<EmployeeExpenseEntity> employeeExpenses) {
        List<Expense> monthlyExpenses = new ArrayList<>();

        SimpleDateFormat monthDateFormat = new SimpleDateFormat("M/yyyy");

        // Create map of monthly expenses
        Map<String, BigDecimal> expenseMap = new HashMap<>();
        for (EmployeeExpenseEntity employeeExpense : employeeExpenses) {
            String month = monthDateFormat.format(employeeExpense.getDate());
            BigDecimal expense = employeeExpense.getPreTaxAmount().add(employeeExpense.getTaxAmount());
            expenseMap.putIfAbsent(month, BigDecimal.ZERO);
            expenseMap.put(month, expenseMap.get(month).add(expense));
        }

        // Parse monthly expense map back into list of Expense objects and sort
        for (Map.Entry<String, BigDecimal> monthlyExpense : expenseMap.entrySet()) {
            try {
                Date month = monthDateFormat.parse(monthlyExpense.getKey());
                monthlyExpenses.add(new Expense(month, monthlyExpense.getValue()));
            } catch (ParseException ex) {
                LOGGER.error("getMonthlyExpenses Error parsing date from monthly expense map");
                return null;
            }
        }
        Collections.sort(monthlyExpenses);

        return monthlyExpenses;
    }


}
