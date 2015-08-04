(function(challenge) {
    var dataService = require('./dataService');
    var multer = require('multer');
    var fs = require('fs');
    var upload = multer({ dest: 'uploads/' });    
    
    challenge.init = function(app) {
        app.post('/api/upload', upload.single('file'), function(req, res) {
            var filePath = req.file.path;            
            fs.readFile(filePath, 'utf8', function(err, data) {
                res.status(200).send('File Uploaded');               
                
                dataService.clear(function(err) {
                    if (err) {
                        console.log('Wiping existing data failed');
                    } else {
                        dataService.setData(data, function(err, data) {
                            if (err)
                            {
                                console.log(err);
                            }                           
                        });
                    }
                });                
            });
        });
        
        app.get('/api/fetch', function(req, res) {
            dataService.getData(function(err, result) {
                if (err)                
                    res.status(400).send('error in getting data');                
                else
                    res.send(result);
            });
        });
    };
})(module.exports);