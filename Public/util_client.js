//Object to hold monthly expense data
let totalExpensesByMonth = {}

 
export default (fileEntries) => {

    fileEntries.forEach(entry => {

        let date = new Date(entry.date)
        let monthAndYear = `${date.getMonth() + 1}/${date.getFullYear()}`
        	//If the month doesn't exist, set it as an object key
        if (!totalExpensesByMonth[monthAndYear]) {

            totalExpensesByMonth[monthAndYear] = entry.pre_tax_amount + entry.tax_amount

        } else {
        	//If the month already exists, increase the expense amount with current entry amounts
            let newSum = totalExpensesByMonth[monthAndYear] + entry.pre_tax_amount + entry.tax_amount
            totalExpensesByMonth[monthAndYear] = newSum
        }
    })

    return totalExpensesByMonth
}
