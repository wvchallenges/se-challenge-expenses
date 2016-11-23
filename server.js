var express    = require('express')
var sqlite3    = require('sqlite3').verbose()
var bodyParser = require('body-parser');
var path       = require("path")
var fs         = require("fs");
var csv        = require("fast-csv");

var app = express()
var PORT = process.env.PORT || 8888;
var db = new sqlite3.Database('sqlGrapher.db')
var dbExists = fs.existsSync('sqlGrapher.db')

app.use(express. static(__dirname + '/'));
app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res) {
	createDB()
	res.sendFile(__dirname + '/home.html');
});

app.get('/graph', function(req, res)
{
	var labels = []
	var prevalues = []
	var aftvalues = []

	db.serialize(function() {
		db.all("SELECT date , SUM(pretaxAmount) AS pre_expense, SUM(pretaxAmount + taxAmount) AS expense FROM Expenses GROUP BY date", function(err, rows) {
		  	rows.forEach(function (row) {  
            	//console.log(row.date, row.expense)
            	labels.push(row.date)
            	aftvalues.push(row.expense)
            	prevalues.push(row.pre_expense)
        	});  

        	res.send([labels, prevalues, aftvalues])
		});
	});

	//res.sendFile(path.join(__dirname+'/home.html'))
});

app.post('/upload', function(req, res)
{
	//console.log(req.body.csvfile)
	var csvfile =  req.body.csvfile

	insertToDB(csvfile)
	res.sendFile(path.join(__dirname+'/home.html'))
});

app.listen(PORT)
module.exports = app
console.log('Server started...')

function createDB()
{
	if (!dbExists)  
	{
		db.run("CREATE TABLE Expenses (date TEXT, category TEXT, employeeName TEXT, employeeAddress TEXT, expenseDescription TEXT, pretaxAmount INT, taxName TEXT, taxAmount INT)", 
		  	function(err) {
		    if (err) console.log(err)
		    else console.log("TABLE CREATED SUCCESSFULLY")
	  	})
	}
}

function insertToDB(csvfile)
{
	csv.fromString(csvfile+'\n', {headers: true})
		.on("data", function(data) {

			db.serialize(function() {
				var query = db.prepare("INSERT INTO Expenses VALUES (?,?,?,?,?,?,?,?)")  
				var date = new Date(data['date'])
				date = (date.getMonth()+1).toString() + "/" + date.getFullYear().toString()

				query.run(date,data['category'],data['employee name'],data['employee address'],data['expense description'],parseInt(data['pre-tax amount']),data['tax name'],parseInt(data['tax amount']), 
				function(err) {
				  if (err) console.log(err)
				  else console.log("RECORD INSERTED SUCCESSFULLY")
				})  
				query.finalize();
			});
		});
}
