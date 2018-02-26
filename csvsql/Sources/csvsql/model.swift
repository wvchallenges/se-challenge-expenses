/// model.swift
/// se-challenge-expenses solution in Swift
/// by Xiaoquan (Rockford) Wei, Feb 26, 2018

/// a Perfect Web Server prefers a pure json style scheme.
/// By such a design, the web server can apply such an architecture:
/// - model.swift, a pure data model file to serve data model
/// - main.swift, a http server route controller
/// - index.html, a static html page to view the data


/// CSV is an open source library for Swift to read / write
import CSV

/// PerfectSQLite is better than the Apple/Swift native SQLite because Perfect can run on Linux as well.
import PerfectSQLite

/// other essential libraries from Apple Inc., such as DateFormatter
import Foundation

/// Financial Expense Model, which defines
/// 1) Expense Record Model, i.e., the rows of CSV file, and mapping it into SQL
/// 2) Expense Report Model
public class ExpenseModel {

  /// a general definition of common errors
  public enum Exception: Error {

    /// error with a possible reason
    case reason(String)
  }

  /// A summary record, grouped by month
  public struct ReportRecord: Encodable {
    public let month: String
    public let preTax: Double
    public let taxAmount: Double

    /// the only way to initialize such a report is from the relational database
    public init(rec: SQLiteStmt) {
      month = rec.columnText(position: 0)
      preTax = rec.columnDouble(position: 1)
      taxAmount = rec.columnDouble(position: 2)
    }
  }

  /// An expense record, according to the CSV definition
  public struct Record: Encodable {
    public let date: Date
    public let category: String
    public let employeeName: String
    public let employeeAddress: String
    public let description: String
    public let preTax: Double
    public let taxName: String
    public let taxAmount: Double

    /// constructor from a CSV row
    /// - parameter csvRow: an array of column data in text
    /// - parameter parserFormat: reference to parse the date field
    /// - parameter blanks: utility reference to trim string
    /// - throws: Exception
    public init(csvRow: [String], parserFormat: DateFormatter, blanks: CharacterSet) throws {
      guard let dt = csvRow.first, csvRow.count == 8,
        let timestamp = parserFormat.date(from: dt) else {
          throw Exception.reason("unexpected row")
      }
      date = timestamp
      category = csvRow[1]
      employeeName = csvRow[2]
      employeeAddress = csvRow[3]
      description = csvRow[4]
      preTax = Double(csvRow[5].trimmingCharacters(in: blanks)) ?? 0.0
      taxName = csvRow[6]
      taxAmount = Double(csvRow[7].trimmingCharacters(in: blanks)) ?? 0.0
    }

    /// constructor from a database record
    /// - parameter rec: a row of database record
    /// - parameter normalizedFormat: reference to parse the date field (only for SQLite)
    /// - throws: Exception
    public init(rec: SQLiteStmt, normalizedFormat: DateFormatter) throws {
      guard let dt = normalizedFormat.date(from: rec.columnText(position: 0)) else {
        throw Exception.reason("unexpected date format")
      }
      date = dt
      category = rec.columnText(position: 1)
      employeeName = rec.columnText(position: 2)
      employeeAddress = rec.columnText(position: 3)
      description = rec.columnText(position: 4)
      preTax = rec.columnDouble(position: 5)
      taxName = rec.columnText(position: 6)
      taxAmount = rec.columnDouble(position: 7)
    }

    /// a validator for verifying if the CSV is expected
    /// - parameter fieldNames: an array of string to represent the CSV header fields
    public static func validate(fieldNames: [String]) throws {
      let standardFields = ["date", "category", "employee name", "employee address",
                            "expense description", "pre-tax amount", "tax name", "tax amount"]
      guard standardFields == fieldNames else {
        throw Exception.reason("Invalid fields")
      }
    }

    /// table creation sql statement
    /// - parameter table: table name, optional
    /// - returns: sql statement to create the table
    public static func create(table: String = "expense") -> String {
      return """
      CREATE TABLE IF NOT EXISTS \(table)(dt TEXT, cat TEXT,
      name TEXT, address TEXT, description TEXT,
      amount FLOAT, taxName TEXT, tax FLOAT)
      """
    }

    /// static method to maintain the insert statement
    public static func fieldNames() -> String {
      return "dt, cat, name, address, description, amount, taxName, tax"
    }

    /// bind a record into insert statement
    /// - parameter insert: the sqlite insert statement
    /// - parameter normalizedFormat: a utility date formatter
    public func bind(insert: SQLiteStmt, normalizedFormat: DateFormatter) throws {
      try insert.bind(position: 1, normalizedFormat.string(from: self.date))
      try insert.bind(position: 2, category)
      try insert.bind(position: 3, employeeName)
      try insert.bind(position: 4, employeeAddress)
      try insert.bind(position: 5, description)
      try insert.bind(position: 6, preTax)
      try insert.bind(position: 7, taxName)
      try insert.bind(position: 8, taxAmount)
    }
  }

  /// database reference handler
	private let db: SQLite

  /// date parser for the example CSV file
	private let parserFormat = DateFormatter()

  /// date formatter for SQL
  private let normalizedFormat = DateFormatter()

  /// demo database file path
  public static let databasePath = "/tmp/tax.db"

  /// database will be closed automatically once released
  deinit {
    db.close()
  }

  /// open an existing database
  /// - parameter sqlitePath: sqlite database path
  /// - throws: Exception
  public init(sqlitePath: String) throws {
    parserFormat.dateFormat = "MM/dd/yy"
    normalizedFormat.dateFormat = "yyyy-MM-dd"
    db = try SQLite(sqlitePath)
  }

  /// setup a database by the input CSV
  /// - parameter csvSourcePath: CSV source file path
  /// - parameter sqlitePath: sqlite database path
  /// - throws: Exception
	public init(csvSourcePath: String, sqlitePath: String) throws {

    // initialize the date formatters
		parserFormat.dateFormat = "MM/dd/yy"
		normalizedFormat.dateFormat = "yyyy-MM-dd"

    // load the source
		guard let source = InputStream(fileAtPath: csvSourcePath) else {
	      throw Exception.reason("CSV loading failure")
	  }

    // close the source file once done.
	  defer {
	    source.close()
	  }

    // load the source content with explicity header row requirement
	  let csv = try CSVReader(stream: source, hasHeaderRow: true)
	  guard let headers = csv.headerRow else {
	    throw Exception.reason("invalid CSV header")
	  }

    // testing if the CSV file is valid
    try Record.validate(fieldNames: headers)

    // open the sql database
		db = try SQLite(sqlitePath)

    // perform table creation if need
	  try db.execute(statement: Record.create(table: "expense"))
    let blanks = CharacterSet(charactersIn: " \t\n\r")

    // iterate all rows in the csv file
		while let row = csv.next() {

      // translate the data into record
      let rec = try Record(csvRow: row, parserFormat: parserFormat, blanks: blanks)

      // then save the record into database
	    let sql = "INSERT INTO expense(\(Record.fieldNames())) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
	    try db.execute(statement: sql) { stmt in
				try rec.bind(insert: stmt, normalizedFormat: normalizedFormat)
	    }
	  }
	}

  /// fetch raw data from the database
  /// - parameter where: where clause, not implemented in this demo.
  /// - parameter limit: limit clause
  /// - parameter by: by clause for pagination purpose, not implemented in this demo
  /// - throws: Exception
  /// - returns: an array of Records, json encodable.
  public func fetch(where: String = "", limit: Int, by: Int = 0) throws -> [Record] {
    var result: [Record] = []
    try db.forEachRow(statement: "SELECT * FROM expense LIMIT \(limit)") { rec, _ in
      let r = try Record(rec: rec, normalizedFormat: self.normalizedFormat)
      result.append(r)
    }
    return result
  }

  /// a summary of the current expenses
  /// - parameter where: where clause, not implemented in this demo.
  /// - throws: Exception
  /// - returns: an array of Report Records, json encodable.
  public func summary(where: String = "") throws  -> [ReportRecord] {
    let sql = """
    SELECT strftime('%Y-%m',date(dt)) as month,
    sum(amount) as total,
    sum(tax) as taxAmount
    FROM expense GROUP BY month
    """
    var result: [ReportRecord] = []
    try db.forEachRow(statement: sql) { rec, _ in
      let r = ReportRecord(rec: rec)
      result.append(r)
    }
    return result
  }
}
