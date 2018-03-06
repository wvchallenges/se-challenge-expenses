package com.wavech.expense.domain;

public class Address {

    public Address(String[] data) {
        this(data[0], data[1], data[2].trim().split(" "));
    }
    public Address(String address1, String city, String[] data) {
        this(address1, city, data[0], Integer.parseInt(data[1].trim()));
    }
    public Address(String address1, String city, String state, int zipCode)
    {
        this.address1 = address1;
        this.city = city;
        this.state = state;
        this.zipCode= zipCode;
    }
    private int id;

    private String address1;

    private String city;

    private String state;

    private int zipCode;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }
}
