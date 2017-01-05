package com.wave.csvconverter.configuration.upload;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class UploadStorageProperties {

    /**
     * Root folder location for temporary storage of the uploaded files
     */
    private String location = "upload-dir";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
