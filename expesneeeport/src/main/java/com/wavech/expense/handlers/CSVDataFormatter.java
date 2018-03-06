package com.wavech.expense.handlers;

import com.wavech.expense.ExpenseReportApplication;
import com.wavech.expense.domain.Address;
import com.wavech.expense.domain.Employee;
import com.wavech.expense.domain.Transaction;
import com.wavech.expense.exception.ExpenseReportException;

import java.io.*;
import java.text.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CSVDataFormatter implements IFormatter<Transaction> {


    @Override
    public List<Transaction> format(InputStream inputStream) throws ExpenseReportException {
        List<Transaction> transactions = new ArrayList<>();
        //TODO: In the case of field validation we will us validator for this in future.
        try (BufferedReader stringReader = new BufferedReader(new InputStreamReader(inputStream))) {
            String data = stringReader.readLine();
            DecimalFormat decimalFormat = getFormat();
            while ((data = stringReader.readLine()) != null) {
                String[] strData = data.split(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*[^\\\"]*$)");
                Arrays.stream(strData).map(x-> {x = x.trim(); return x.replaceAll("\"","");}).toArray(onj -> strData);
                Transaction transaction = new Transaction();
                transaction.setDate(new SimpleDateFormat("MM/dd/yyyy").parse(strData[0]));
                transaction.setCategpory(strData[1]);
                transaction.setEmployee(new Employee(strData[2].split(" "),new Address(strData[3].split(","))));
                transaction.setDescription(strData[4]);
                transaction.setAmount(decimalFormat.parse(strData[5]).doubleValue());
                transaction.setTaxName(strData[6]);
                transaction.setTaxAmount(decimalFormat.parse(strData[7]).doubleValue());
                transactions.add(transaction);
            }
        } catch (IOException e) {
           throw new ExpenseReportException("File read error", e);
        } catch (ParseException e) {
            throw new ExpenseReportException("Invalid date format", e);
        }
        return transactions;
    }

    private DecimalFormat getFormat() {
        DecimalFormat format = new DecimalFormat();
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setDecimalSeparator(',');
        symbols.setGroupingSeparator(' ');
        format.setDecimalFormatSymbols(symbols);
        return format;
    }
}
