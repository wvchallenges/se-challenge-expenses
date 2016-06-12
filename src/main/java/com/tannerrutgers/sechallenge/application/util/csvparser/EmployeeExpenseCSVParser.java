package com.tannerrutgers.sechallenge.application.util.csvparser;

import com.tannerrutgers.sechallenge.application.entity.EmployeeExpenseEntity;
import org.apache.commons.csv.CSVRecord;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * $DateTime$
 *
 * @Version $Header$
 * @Author $Author$
 */
public class EmployeeExpenseCSVParser extends CSVEntityParser<EmployeeExpenseEntity> {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("M/d/yyyy");

    private static final String DATE_FIELD = "date";
    private static final String CATEGORY_FIELD = "category";
    private static final String EMPLOYEE_NAME_FIELD = "employee name";
    private static final String EMPLOYEE_ADDRESS_FIELD = "employee address";
    private static final String EXPENSE_DESCRIPTION_FIELD = "expense description";
    private static final String PRE_TAX_AMOUNT_FIELD = "pre-tax amount";
    private static final String TAX_NAME_FIELD = "tax name";
    private static final String TAX_AMOUNT_FIELD = "tax amount";

    Map<String, String> fieldMap;

    public EmployeeExpenseCSVParser() {
        super();
        fieldMap = new HashMap<>();
        fieldMap.put("date", DATE_FIELD);
        fieldMap.put("category", CATEGORY_FIELD);
        fieldMap.put("employeeName", EMPLOYEE_NAME_FIELD);
        fieldMap.put("employeeAddress", EMPLOYEE_ADDRESS_FIELD);
        fieldMap.put("expenseDescription", EXPENSE_DESCRIPTION_FIELD);
        fieldMap.put("preTaxAmount", PRE_TAX_AMOUNT_FIELD);
        fieldMap.put("taxName", TAX_NAME_FIELD);
        fieldMap.put("taxAmount", TAX_AMOUNT_FIELD);
    }


    @Override
    protected EmployeeExpenseEntity recordToEntity(CSVRecord record) throws ParseException {
        EmployeeExpenseEntity entity = new EmployeeExpenseEntity();
        entity.setDate(DATE_FORMAT.parse(record.get(fieldMap.get("date"))));
        entity.setCategory(record.get(fieldMap.get("category")));
        entity.setEmployeeName(record.get(fieldMap.get("employeeName")));
        entity.setEmployeeAddress(record.get(fieldMap.get("employeeAddress")));
        entity.setExpenseDescription(record.get(fieldMap.get("expenseDescription")));
        entity.setPreTaxAmount(currencyStringToBigDecimal(record.get(fieldMap.get("preTaxAmount"))));
        entity.setTaxName(record.get(fieldMap.get("taxName")));
        entity.setTaxAmount(currencyStringToBigDecimal(record.get(fieldMap.get("taxAmount"))));
        return entity;
    }

    private BigDecimal currencyStringToBigDecimal(String currency) {
        BigDecimal bigDecimal = BigDecimal.ZERO;
        if (currency != null) {
            currency = currency.replaceAll(",","").trim();
            bigDecimal = new BigDecimal(currency);
        }
        return bigDecimal;
    }
}
