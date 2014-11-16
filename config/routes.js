module.exports = function(app){

	//home route
	app.get('/', function (req, res) {
    res.render('home');
  });

};
