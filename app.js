var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var multer  = require('multer');
var Converter = require("csvtojson").Converter;
var app = express();
app.use(express.static(__dirname + '/public'));
var uploadDir = './uploads';
//make sure destination folder is exist
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
app.disable('x-powered-by');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {    
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage}).single('file');

var pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wave_challenge'
});

app.set('port', process.env.PORT || 3000 );

app.get('/', function(req,res){
    res.sendFile(__dirname  + '/index.html');
});

app.post('/api/upload/file',function(req,res){
    upload(req, res, function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        var filePath = req.file.destination + '/' + req.file.filename;
        var amounts = {};
        var converter = new Converter({});//new instants for each request
            converter.fromFile(filePath,function(err,result){
                if(err) console.log(err);
                result.forEach(function(element) {
                    element['date'] = FormatMySqlDateStringAndCalculate(element,'mm/dd/yyyy','/',amounts);
                    pool.query('insert into wave_bill_2 set ?', element, function(err,res){
                        if(err) throw err;
                        console.log('Last insert ID:',res.insertId);
                    });
                }, this);
                res.send(amounts);
            });
    });
});

function FormatMySqlDateStringAndCalculate(_element,_format,_delimiter,_amounts)
{
    _date = _element['date'];
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var formattedStr = dateItems[yearIndex] + '-' + dateItems[monthIndex] + '-' + dateItems[dayIndex];

    //remove , in string and calculate total amount
    if(typeof _element['pre-tax amount'] === 'string')
        _element['pre-tax amount'] = parseFloat(_element['pre-tax amount'].replace(/,/g,''));
    if(typeof _element['tax amount'] === 'string')
        s_element['tax amount'] = parseFloat(_element['tax amount'].replace(/,/g,''));
    if(!_amounts[dateItems[monthIndex]]){
        _amounts[dateItems[monthIndex]] = roundToTwo(_element['pre-tax amount'] + _element['tax amount']);
    }
    else{
        _amounts[dateItems[monthIndex]] = roundToTwo(_amounts[dateItems[monthIndex]] + _element['pre-tax amount'] + _element['tax amount']);
    }

    return formattedStr;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

app.listen(app.get('port'),function(){
    console.log("We have started our server on port 3000");
});