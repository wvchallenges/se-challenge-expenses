const Files = require('./db_config')
const parse = require('csv-parse')

module.exports = (file) => {

	//Gets rid of file headers
	let fileRows = file.slice(1)

	let comma = /([,])/g

	// Format file to parse string at each index 
	let parsedFile = fileRows.map(line => {

		//If num has comma, deletes comma to parse num
		let l = line[5]
		let valWithoutComma
		if(comma.test(l)) {
			let indx = l.indexOf(',')
			valWithoutComma = [...l]
			valWithoutComma.splice(indx, 1)
		}

		return {
			date: line[0],
			category: line[1],
			employee_name: line[2],
			employee_address: line[3],
			expense_description: line[4],
			pre_tax_amount: valWithoutComma ? parseInt(valWithoutComma.join('')) : parseInt(line[5]),
			tax_name: line[6],
			tax_amount: parseFloat(line[7])
		}
	})

	return parsedFile
}