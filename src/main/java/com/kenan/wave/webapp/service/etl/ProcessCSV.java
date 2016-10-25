package com.kenan.wave.webapp.service.etl;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.log4j.Logger;

import com.kenan.wave.webapp.service.ExpenseItem;

/**
 * load and parse expense csv and store in sql database csv format :
 * date,category,employee name,employee address,expense description,pre-tax
 * amount,tax name,tax amount
 * 
 * @author kenanunal
 *
 */
public class ProcessCSV {
	Logger LOGGER = Logger.getLogger(ProcessCSV.class);
	private final String DEFAULT_CSV = "/var/data/data_example.csv";

	public ProcessCSV() {

	}

	public List<ExpenseItem> parse() throws IOException {
		List<ExpenseItem> expenses = new ArrayList<ExpenseItem>();
		int row = 1;
		Reader in = new FileReader(DEFAULT_CSV);
		Iterable<CSVRecord> records = CSVFormat.RFC4180.withHeader("date",
				"category", "employee name", "employee address",
				"expense description", "pre-tax amount", "tax name",
				"tax amount").withSkipHeaderRecord().parse(in);
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		for (CSVRecord record : records) {
			try {
				ExpenseItem newItem = new ExpenseItem(new java.sql.Date(df
						.parse(record.get("date")).getTime()),
						record.get("category"), record.get("employee name"),
						record.get("employee address"),
						record.get("expense description"), 
						new BigDecimal(record.get("pre-tax amount").replaceAll(",", "").trim()),
						record.get("tax name"), 
						new BigDecimal(record.get("tax amount").replaceAll(",", "").trim()));
				System.out.println(newItem.toString());
				expenses.add(newItem);
				row++;
			} catch (ParseException pe) {
				LOGGER.error("Corrupted record on row "+ (row));
			}
		}

		return expenses;
	}
	
	public static void main(final String[] args) {
		ProcessCSV parser = new ProcessCSV();
		try {
			parser.parse();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
