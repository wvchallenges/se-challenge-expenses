package com.tannerrutgers.sechallenge.application.model.report;

import java.util.ArrayList;
import java.util.List;

/**
 * Abstract class representing a Report (or table).
 *
 * Implementations should
 */
public abstract class Report<T> {

    protected String title;
    protected List<String> headers;
    protected List<List<String>> rows;

    protected Report(String title, List<String> headers) {
        this.title = title;
        this.headers = headers;
        this.rows = new ArrayList<>();
    }

    public abstract void populateReport(List<T> rows);

    public String getTitle() {
        return title;
    }

    public List<String> getHeaders() {
        return headers;
    }

    public List<List<String>> getRows() {
        return rows;
    }
}
