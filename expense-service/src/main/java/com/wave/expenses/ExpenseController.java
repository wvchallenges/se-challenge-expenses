package com.wave.expenses;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.util.*;


/**
 * REST Controller for the Wave Expense Manager application.
 */


@CrossOrigin
@RestController
@RequestMapping(value="/expense")
public class ExpenseController {


    @Autowired
    private ExpenseRepository expenseRepository;


    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }


    @CrossOrigin
    @GetMapping("/monthlytotals")
    public Object [] sumExpensesByMonth() throws Exception {
        return expenseRepository.sumExpensesByMonth();
    }


    @CrossOrigin
    @PostMapping("/upload")
    public Iterable<Expense> handleUploadedFile(@RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("File Name = " + file.getOriginalFilename() + " , File Size = " + file.getSize());
        Set<Expense> recordsInFile = parseDataFromFile(file);
        return expenseRepository.save(recordsInFile);
    }


    /*
    The following 3 REST API methods - getAllExpenses(), getExpense(), and createExpense() are not required for the
    programming exercise. They are merely included to provide a standard REST interface for the service. And used
    during testing to create, read, and verify individual expense records.
     */

    @CrossOrigin
    @GetMapping("")
    public Iterable<Expense> getAllExpenses() throws Exception {
        return expenseRepository.findAll();
    }


    @CrossOrigin
    @GetMapping("/{id}")
    public Expense getExpense(@PathVariable("id") Long id) throws Exception {
        return expenseRepository.findOne(id);
    }


    @CrossOrigin
    @PostMapping
    public Expense createExpense(@Valid @RequestBody Expense expense) throws JsonProcessingException, ParseException {
        expense.setComputedData();
        Expense savedExpense = expenseRepository.save(expense);
        return savedExpense;
    }

    /**
     * Parse csv tokens from each line and create an Expense data value object.
     *
     * @param line
     * @return
     * @throws Exception
     */
    public Expense dataFromLine(String line) throws Exception {

        String [] tokens = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

        if (tokens.length != 8) {
            throw new Exception("Incorrect number of tokens in the input line");
        }

        // Sample line from the csv file to verify the order of the tokens.
        // 2/18/2014,Travel,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Airplane ticket to NY," 1,500.00 ",CA Sales tax, 112.50

        Expense expense = new Expense();
        expense.setDateString(clean(tokens[0]));
        expense.setCategory(clean(tokens[1]));
        expense.setEmployeeName(clean(tokens[2]));
        expense.setEmployeeAddress(clean(tokens[3]));
        expense.setExpenseDescription(clean(tokens[4]));
        expense.setAmountPreTax(Double.parseDouble(cleanNumber(tokens[5])));
        expense.setTaxName(clean(tokens[6]));
        expense.setAmountTax(Double.parseDouble(cleanNumber(tokens[7])));

        // Fields like date, amount with tax, etc. require further manipulation before persistence.
        expense.setComputedData();

        return expense;
    }


    /**
     * Clean the data by removing enclosing quotes, end spaces etc.
     * @param data
     * @return data
     */
    public String clean(String data) {

        // Trim whitespaces at ends
        data = data.trim();

        // String quote marks at ends
        if (data.startsWith("\"")) {
            data = data.substring(1, data.length() - 2);

            // Trim whitespaces at ends in case they were present inside quote marks
            data = data.trim();
        }

        return data;
    }


    /**
     * Clean numeric data by retaining only digits and dot. Remove all other chars. Making reasonable assumption that
     * only one dot will be present. If more than one data is present, consider it a legitimate input error. In real
     * world application, the user should be prompted to correct that mistake and re-upload corrected file.
     *
     * @param data
     * @return data
     */
    public String cleanNumber(String data) {
        return clean(data).replaceAll("[^\\d.]", "");
    }



    /**
     * Read each line from the input file and process the data.
     * @param file
     * @return parsedRecords    Set of unique records from the input file
     * @throws Exception
     */
    public Set<Expense> parseDataFromFile(MultipartFile file) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
        Set<Expense> parsedRecords = new LinkedHashSet<Expense>();

        // Discard header line
        br.readLine();

        // Process all subsequent lines
        for (String line; (line = br.readLine()) != null; ) {
            Expense record = dataFromLine(line);
            parsedRecords.add(record);
        }
        return parsedRecords;
    }

}
