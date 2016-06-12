package com.tannerrutgers.sechallenge.application.controller;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import com.tannerrutgers.sechallenge.application.model.Expense;
import com.tannerrutgers.sechallenge.application.service.EmployeeExpenseService;
import com.tannerrutgers.sechallenge.application.util.csvparser.EmployeeExpenseCSVParser;
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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * $DateTime$
 *
 * @Version $Header$
 * @Author $Author$
 */
@Controller
public class EmployeeExpenseController {

    private static final String CONTENT_TYPE_CSV = "text/csv";
    private static final SimpleDateFormat MONTH_DATE_FORMAT = new SimpleDateFormat("M/yyyy");

    @Inject
    EmployeeExpenseService employeeExpenseService;
    @Inject
    EmployeeExpenseCSVParser employeeExpenseCSVParser;

    @RequestMapping(method = RequestMethod.GET, value="/employeeexpenses")
    public String loadPage() {
        return "employeeExpenses";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/employeeexpenses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadExpensesFile(@RequestParam("file") MultipartFile file,
                                         RedirectAttributes redirectAttributes) {
        String message = null;
        String filename = file.getOriginalFilename();
        if (!file.isEmpty()) {
            if (CONTENT_TYPE_CSV.equals(file.getContentType())) {
                try {
                    List<EmployeeExpenseEntity> expenses = employeeExpenseCSVParser.parseCSVToEntities(file.getInputStream());
                    employeeExpenseService.createExpenses(expenses);
                    message = "Upload successful!";
                    redirectAttributes.addFlashAttribute("monthlyExpenses", getMonthlyExpenses(expenses));
                } catch (IOException|ParseException|IllegalArgumentException ex) {
                    message = "The uploaded file (" + filename + ") has unexpected content or cannot be parsed.";
                }
            } else {
                message = "The uploaded file (" + filename + ") is not a supported file type.";
            }
        } else {
            message = "The uploaded file (" + filename + ") appears to be empty.";
        }
        redirectAttributes.addFlashAttribute("message", message);
        return "redirect:/employeeexpenses";
    }

    private List<Expense> getMonthlyExpenses(List<EmployeeExpenseEntity> employeeExpenses) throws ParseException {
        List<Expense> monthlyExpenses = new ArrayList<>();

        Map<String, BigDecimal> expenseMap = new HashMap<>();
        for (EmployeeExpenseEntity employeeExpense : employeeExpenses) {
            String month = MONTH_DATE_FORMAT.format(employeeExpense.getDate());
            BigDecimal expense = employeeExpense.getPreTaxAmount().add(employeeExpense.getTaxAmount());
            expenseMap.putIfAbsent(month, BigDecimal.ZERO);
            expenseMap.put(month, expenseMap.get(month).add(expense));
        }

        for (Map.Entry<String, BigDecimal> monthlyExpense : expenseMap.entrySet()) {
            Date month = MONTH_DATE_FORMAT.parse(monthlyExpense.getKey());
            monthlyExpenses.add(new Expense(month, monthlyExpense.getValue()));
        }

        Collections.sort(monthlyExpenses);

        return monthlyExpenses;
    }


}
