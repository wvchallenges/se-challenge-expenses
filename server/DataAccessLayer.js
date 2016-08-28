module.exports = class DataAccessLayer {

    /**
     * Creates an instance of DataAccessLayer.
     * 
     * @param {DataManager} dataManager
     */
    constructor(dataManager) {
        this._dm = dataManager;
    }

    /**
     * Insert the EmployeeExpense records given an array representing
     * employee expense objects
     * 
     * @param {DataManager} dataArray
     * @returns {Promise}
     */
    insertEmployeeExpenseRecords(dataArray) {        
        const sql = `
            INSERT INTO EmployeeExpense (
                Date, 
                Category, 
                EmployeeName,
                EmployeeAddress, 
                ExpenseDescription, 
                PreTaxAmount, 
                TaxName, 
                TaxAmount
            )
            VALUES (
                $date,
                $category,
                $employeeName,
                $employeeAddress,
                $expenseDescription,
                $preTaxAmount,
                $taxName,
                $taxAmount
            )`;
        
        // Map the input data to a parameter object that can be used by the query.
        const queryData = dataArray.map(row => {
            return {
                $date: row.date,
                $category: row.category,
                $employeeName: row.employeeName,
                $employeeAddress: row.employeeAddress,
                $expenseDescription: row.expenseDescription,
                $preTaxAmount: row.preTaxAmount,
                $taxName: row.taxName,
                $taxAmount: row.taxAmount
            }
        });

        return this._dm.bulkInsert(sql, queryData);
    }

    /**
     * Get all of the records in the EmployeeExpense table
     * 
     * @returns {Promise}
     */
    getEmployeeExpenseRecords() {
        const sql = `
            SELECT
                Date, 
                Category, 
                EmployeeName,
                EmployeeAddress, 
                ExpenseDescription, 
                PreTaxAmount, 
                TaxName, 
                TaxAmount
            FROM
                EmployeeExpense
        `;

        // Map the results back to the format we're expecting and return the 
        // chained promise
        return this._dm.select(sql).then(rows => rows.map(row => {
            return {
                date: new Date(row.Date),
                category: row.Category,
                employeeName: row.EmployeeName,
                employeeAddress: row.EmployeeAddress,
                expenseDescription: row.ExpenseDescription,
                preTaxAmount: row.PreTaxAmount,
                taxName: row.TaxName,
                taxAmount: row.TaxAmount
            };
        }));
    }
}