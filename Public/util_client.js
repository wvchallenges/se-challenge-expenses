//Object to hold monthly expense data
let totalExpensesByMonth = {} 

export default (files) => {

	files.forEach(file => {

		let date = new Date(file.date)
		let monthAndYear = `${date.getMonth() + 1}/${date.getFullYear()}`

		if(!totalExpensesByMonth[monthAndYear]) {
			totalExpensesByMonth[monthAndYear] = file.pre_tax_amount + file.tax_amount
		} else {
			
			let newSum = totalExpensesByMonth[monthAndYear] + file.pre_tax_amount + file.tax_amount
			totalExpensesByMonth[monthAndYear] = newSum
		}
	})

	return totalExpensesByMonth
}