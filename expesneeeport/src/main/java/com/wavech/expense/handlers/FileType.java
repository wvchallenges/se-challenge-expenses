package com.wavech.expense.handlers;

import java.util.Arrays;

public enum FileType {
    CSV(".csv", new CSVDataFormatter());

    String fileType;
    IFormatter iFormatter;
    FileType(String mimeType, IFormatter iFormatter) {
        this.fileType = mimeType;
        this.iFormatter = iFormatter;
    }

    public static FileType getType(String mimeType) {

        return Arrays.stream(FileType.values()).filter(x->x.fileType.equals(mimeType)).findFirst().get();
    }

    public IFormatter getIFormatter() {
        return iFormatter;
    }
}
