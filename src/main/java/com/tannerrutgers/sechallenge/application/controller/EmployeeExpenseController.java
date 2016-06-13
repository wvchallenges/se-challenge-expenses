package com.tannerrutgers.sechallenge.application.controller;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import com.tannerrutgers.sechallenge.application.model.Expense;
import com.tannerrutgers.sechallenge.application.model.report.MonthlyExpenseReport;
import com.tannerrutgers.sechallenge.application.model.report.Report;
import com.tannerrutgers.sechallenge.application.service.EmployeeExpenseService;
import com.tannerrutgers.sechallenge.application.util.csvparser.EmployeeExpenseCSVParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.inject.Inject;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    public String loadPage() {
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
        String errorMessage = null;
        String filename = file.getOriginalFilename();
        if (!file.isEmpty()) {
            if (CONTENT_TYPE_CSV.equals(file.getContentType())) {
                try {
                    List<EmployeeExpenseEntity> expenses = employeeExpenseCSVParser.parseCSVToEntities(file.getInputStream());
                    employeeExpenseService.createExpenses(expenses);
                    redirectAttributes.addFlashAttribute("report", getMonthlyExpenseReport(expenses));
                    message = "<strong>Success!</strong> " + filename + " was successfully uploaded and saved!";
                    LOGGER.info("uploadEmployeeExpensesFile successful");
                } catch (IOException|ParseException|IllegalArgumentException ex) {
                    errorMessage = "The uploaded file <strong>" + filename + "</strong> has unexpected content or cannot be parsed. Please try a different file.";
                    LOGGER.info("uploadEmployeeExpensesFile failed", ex);
                } catch (DataAccessException ex) {
                    errorMessage = "There was an error saving employee expenses. Please try again.";
                    LOGGER.error("uploadEmployeeExpensesFile failed", ex);
                }
            } else {
                errorMessage = "The uploaded file <strong>" + filename + "</strong> is not a supported file type. Please only upload .csv files.";
                LOGGER.info("uploadEmployeeExpensesFile received unsupported file type: " + filename);
            }
        } else {
            errorMessage = "The uploaded file <strong>" + filename + "</strong> appears to be empty. Please try a different file.";
            LOGGER.info("uploadEmployeeExpenseFile received empty file");
        }
        redirectAttributes.addFlashAttribute("message", message);
        redirectAttributes.addFlashAttribute("errorMessage", errorMessage);
        return "redirect:/employee-expenses";
    }

    /**
     * Generates a list of Expense model objects from a list of Employee Expense entities
     * @param employeeExpenses List of employee expense entities from which to generate Expenses
     * @return List of Expenses
     */
    private Report<Expense> getMonthlyExpenseReport(List<EmployeeExpenseEntity> employeeExpenses) {
        List<Expense> expenses = new ArrayList<>();
        for (EmployeeExpenseEntity employeeExpense : employeeExpenses) {
            LocalDate date = employeeExpense.getDate();
            BigDecimal totalExpense = employeeExpense.getPreTaxAmount().add(employeeExpense.getTaxAmount());
            expenses.add(new Expense(date, totalExpense));
        }
        return new MonthlyExpenseReport(expenses);
    }


}
