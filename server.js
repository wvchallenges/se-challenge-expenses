var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser({ limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
var other = bodyParser.urlencoded({ extended: true });

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (request, response, next)
{
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    next();
});

var getConnection = function ()
{
    var connection = mysql.createConnection({
        host: 'sql5.freesqldatabase.com',
        user: 'sql5131815',
        password: 'YnplTrElxL',
        database: 'sql5131815'
    });

    return connection;
};

app.get("/expenses", function (request, response)
{
    var connection = getConnection();
    var query = "SELECT sum(PreTaxAmount) as TotalExpense, MONTHNAME(Date) as Month FROM TaxInfo group by MONTHNAME(Date) ORDER BY TotalExpense ASC";
    connection.query(query, function (err, result)
    {
        if (err)
        {
            response.send(err);
        }
        else
        {
           response.send(result);
        }
    });
}); 

app.post("/upload", other, function (request, response)
{
    var connection = getConnection();

    var csvData = request.body;
    var values = "";
    var index = 0;
    for (var index = 0; index < csvData.length; index++)
    {
        var row = csvData[index];
        values += getRowValues(row);
        if (index < csvData.length - 1)
        {
            values += ",";
        }
    }

    var insert = "INSERT INTO TaxInfo (Date, EmployeeName, EmployeeAddress, ExpenseDescription, PreTaxAmount, TaxName, TaxAmount, Category) VALUES " + values;
    console.log(insert);
    var query = connection.query(insert, function (err, result)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
           console.log("done"); 
        }
    });
    response.send({ test: "test" });
});

var getRowValues = function (row)
{
    var query = "(";
    query += "STR_TO_DATE('" + row["date"] + "', '%m/%d/%Y'),";
    query += "'" + row["employee name"].replace(/\"/g, "") + "',";
    query += "'" + row["employee address"].replace(/\"/g, "") + "',";
    query += "'" + row["expense description"].replace(/\"/g, "") + "',";
    query += "" + row["pre-tax amount"].replace(",", "") + ",";
    query += "'" + row["tax name"].replace(/\"/g, "") + "',";
    query += "" + row["tax amount"].replace(",", "") + ",";
    query += "'" + row["category"].replace(/\"/g, "") + "'";
    query += ")";

    return query;
};

var server = http.createServer(app);
server.listen(app.get('port'), function ()
{
    console.log("Server started on " + app.get('port'));
});
module.exports = app;