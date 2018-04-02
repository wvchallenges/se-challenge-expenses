package com.wave.challenge.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.wave.challenge.db.EmployeeExpense;
import com.wave.challenge.db.EmployeeExpenseMonthlyReport;
import com.wave.challenge.db.EmployeeExpenseRepository;

@Controller
public class CsvController {

  @Autowired
  private EmployeeExpenseRepository employeeExpenseRepository;

  @PostMapping(value = "/csv", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EmployeeExpenseMonthlyReport> handleCsvFileUpload(@RequestParam("csvfile") MultipartFile file) {
    saveCsvToDB(file);
    return employeeExpenseRepository.getMonthlyExpenseReport();
  }

  // It would be appropriate to split out CSV to DB Entity mapping logic in another class if the requirements expanded
  // It might also be appropriate to parse the CSV on another thread
  private void saveCsvToDB(MultipartFile file) {
    try {
      BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
      Iterable<CSVRecord> records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(reader);
      for (CSVRecord record : records) {
          String date = record.get("date");
          String category = record.get("category");
          String employeeName = record.get("employee name");
          String employeeAddress = record.get("employee address");
          String expenseDescription = record.get("expense description");
          String preTaxAmount = record.get("pre-tax amount").replaceAll(",", "");
          String taxName = record.get("tax name");
          String taxAmount = record.get("tax amount").replaceAll(",", "");
          LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("M/d/yyyy"));
          //TODO: Double types are not appropriate for storing money values
          EmployeeExpense expense = new EmployeeExpense(parsedDate, category, employeeName, employeeAddress, 
              expenseDescription, Double.parseDouble(preTaxAmount), taxName, Double.parseDouble(taxAmount));
          employeeExpenseRepository.save(expense);
      }
    } catch (IOException e) {
      //TODO: Provide feedback to user that something went wrong
      e.printStackTrace();
    }
  }
}
