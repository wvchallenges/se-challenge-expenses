package com.wavech.expense.domain;

public class Employee {

    public Employee(String firstName, String lastName, Address  address) {
            this.fName = firstName;
            this.lName = lastName;
            this.address = address;
    }
    public Employee(String[] names, Address  address) {
       this(names[0], names[1], address);
    }

    private int id;

    private String fName;

    private String lName;

    private Address  address;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
