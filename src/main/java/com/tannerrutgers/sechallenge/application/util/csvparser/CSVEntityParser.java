package com.tannerrutgers.sechallenge.application.util.csvparser;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Abstract class encapsulating ability to generate a List of entities from a CSV file
 */
public abstract class CSVEntityParser<T> {

    /**
     * Parses the CSV file represented by the given InputStream into a list of Entity objects
     * defined by the concrete implementation of this class
     * @param inputStream InputStream corresponding to desired CSV file
     * @return List<T> of entity objects
     * @throws IOException if I/O error occurs accessing inputStream
     */
    public List<T> parseCSVToEntities(InputStream inputStream) throws IOException, ParseException {
        List<T> entities = new ArrayList<>();

        Reader reader = new InputStreamReader(inputStream);
        CSVParser csvParser = CSVFormat.DEFAULT
                .withFirstRecordAsHeader()
                .withIgnoreSurroundingSpaces()
                .parse(reader);
        for (CSVRecord record : csvParser.getRecords()) {
            entities.add(recordToEntity(record));
        }
        return entities;
    }

    /**
     * Should transform the given CSVRecord into an entity of the concrete implementation entity type
     * @param record CSVRecord with columns accessible by name as defined in first row header
     * @return *Entity object represented by record
     */
    protected abstract T recordToEntity(CSVRecord record) throws ParseException;
}
