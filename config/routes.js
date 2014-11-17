module.exports = function(app, config, controllers){

	//home route
	app.get('/', function (req, res) {
    res.render('home');
  });

  //file upload route
  app.post('/CSVform', controllers.csvHandler.postCSVFile);

};
