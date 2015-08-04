(function(dataService) {
    var pg = require('pg');    
    var moment = require('moment');    
    var uuid = require('uuid');    
    var DATE_COLUMN_INDEX = 0;
    
    function runQuery(query, next) {        
        var params = { 
            host: 'ec2-107-21-125-143.compute-1.amazonaws.com',
            user: 'zkwenuxumvcdiw',
            password: 'yY4GuAoovV0kct08lmjsoWh0ux',
            database: 'daifnt3b0e5ia5',
            ssl: true 
        };
        var client = new pg.Client(params);        
        
        client.connect(function(err) {
            if(err) {
                console.log(err);
                next(err, null);
            }
            
            client.query(query, function(err, result) {
                if(err) {
                    console.log(err);
                    next(err, null);
                }            

                next(null, result);
                client.end();
            });
        });
    };          
    
    dataService.getData = function(next) {
        var query = 'SELECT * FROM waveinfo';
        runQuery(query, function(err, result) {
            if (err) {
                next(err);
            }
            else
            {                
                next(null, result.rows);
            }
        });        
    };  
    
    dataService.setData = function(data, next) {                     
        var lines = preProcessData(data);        
        var header = lines.shift();
        var columnNames = preProcessHeader(header);   
        
        lines.forEach(function(line) {                   
            var lineValues = preProcessLine(line);             

            lineValues.unshift(uuid.v1()); //Add UUID
            var values = lineValues
                .map(function(s) { 
                    return "'" + s + "'"; 
                })
                .join();

            var query = "INSERT INTO waveinfo VALUES(" + values + ")";
            runQuery(query, function(err, result) {
                if (err) {
                    console.log(err);
                }
                else
                {                
                    next(null, result);
                }
            });
        });
    }; 
                      
    dataService.clear = function(next) {  
            var query = "DELETE FROM waveinfo";
            runQuery(query, function(err, result) {
                if (err) {
                    next(err, null);
                }
                else
                {                
                    next(null);
                }
            });            
    };
    
    
    function preProcessData(data) {
        var os = require('os');
        return data.split(os.EOL);                                 
    }
    
    function preProcessHeader(header) {
        var headers = header.split(',');               
        
        var columnNames = [];            
        headers.forEach(function(h) {
            var columnName = h.replace(' ', '_').replace('-', '_').toLowerCase();
            columnNames.push(columnName);
        });

        return columnNames;
    }
    
    function preProcessLine(line) {
        var values = [];
        
        try
        {
            var compound = false;
            var part = '';
            
            for(var i = 0, ch = ''; ch = line.charAt(i); i++){                 
                if (ch === '"')
                {
                    compound = !compound;
                }
                else if ((ch === ',') && !compound)
                {
                    if (values.length === DATE_COLUMN_INDEX) { //First Column is DATE Column
                        part = moment(part, 'MM-DD-YYYY').format();
                    }                    
                    
                    values.push(part);
                    part = '';
                }
                else
                    part += ch;
            }

            //Last part
            values.push(part);
        }
        catch (err)
        {
            console.log(err);
        }

        return values;
    }       
})(module.exports);