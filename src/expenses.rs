
use std::io::Read;
use std::collections::HashMap;

use csv;
use chrono::NaiveDate;
use chrono::Datelike;
use postgres::Connection;
use itertools::Itertools;

pub struct Expense {
    date: NaiveDate,
    category: String,
    name: String,
    address: String,
    description: String,
    amount: f32,
    tax_name: String,
    tax_amount: f32,
}

pub fn insert(e: &Expense, conn: &mut Connection) {
    conn.execute("INSERT INTO expenses (date, category, name, address, description, amount, tax_name, tax_amount) VALUES \
                                       ($1  , $2      , $3  , $4     , $5         , $6    , $7      , $8);",
                 &[&e.date, &e.category, &e.name, &e.address, &e.description, &e.amount, &e.tax_name, &e.tax_amount])
        .unwrap();
}

fn parse_amount(input: String) -> f32 {
    input.trim().replace(",", "").parse().unwrap()
}

pub fn from_csv<T: Read>(input: &mut T) -> Vec<Expense> {
    let mut reader = csv::Reader::from_reader(input);
    let mut res = Vec::new();
    for rec in reader.decode().map(Result::unwrap) {
        let (date, category, name, address, description, amount, tax_name, tax_amount):
            (String, String, String, String, String, String, String, String) = rec;
        let real_date = NaiveDate::parse_from_str(&date, "%m/%d/%Y").unwrap();

        res.push(Expense { 
            date: real_date,
            category: category,
            name: name,
            address: address,
            description: description,
            amount: parse_amount(amount),
            tax_name: tax_name,
            tax_amount: parse_amount(tax_amount),
        });
    }
    res
}

pub fn total_by_month<T: Iterator<Item=Expense>>(input: T) -> HashMap<String, String> {
    let mut buffer: Vec<Expense> = input.collect();
    buffer.sort_by(|a, b| a.date.cmp(&b.date));

    buffer.into_iter()
        .group_by(|e| format!("{}/{:0>2}", e.date.year(), e.date.month()))
        .map(|(month, expenses)| (month, expenses.iter().fold(0.0, |a, ref x| a+x.amount + x.tax_amount)))
        .map(|(month, total) | (month, format!("{:.2}", total)))
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;
    use std::io::Cursor;
    use chrono::NaiveDate;

    #[test]
    fn deserialize() {
        let data = "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n12/1/2013,Travel,Don Draper,\"783 Park Ave, New York, NY 10021\",Taxi ride, 350.00 ,NY Sales tax, 31.06";

        let mut cursor = Cursor::new(data);

        let expenses = from_csv(&mut cursor);

        assert_eq!(1, expenses.len());
        
        let expense = expenses.get(0).unwrap();

        assert_eq!("Don Draper", expense.name);

        assert_eq!(31.06, expense.tax_amount);
    }

    #[test]
    fn by_month() {
        let m1 = NaiveDate::from_ymd(2000, 1, 1);
        let m2 = NaiveDate::from_ymd(2015, 7, 1);

        fn expense_for_date_amount(date: &NaiveDate, amount: f32, tax_amount: f32) -> Expense {
            Expense {
                date: date.clone(),
                category: String::new(),
                name: String::new(),
                address: String::new(),
                description: String::new(),
                amount: amount,
                tax_name: String::new(),
                tax_amount: tax_amount
            }
        }
        let expenses = vec![
            expense_for_date_amount(&m1, 30.0, 10.0),
            expense_for_date_amount(&m1, 10.0, 0.0),
            expense_for_date_amount(&m2, 30.0, 10.0),
        ];

        let expenses_by_month = total_by_month(expenses.into_iter());

        assert_eq!("50.00", *expenses_by_month.get("2000/01").unwrap());
        assert_eq!("40.00", *expenses_by_month.get("2015/07").unwrap());
    }
}

