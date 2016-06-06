
CREATE TABLE IF NOT EXISTS expenses (
    id          serial PRIMARY KEY,
    date        date,
    category    varchar(64),
    name        varchar(64),
    address     varchar(64),
    description varchar(128),
    amount      real,
    tax_name    varchar(64),
    tax_amount  real 
);

