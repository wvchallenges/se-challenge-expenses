// Export api routes

module.exports = function(app) {
	var fileController = require('./../controllers/fileController');
	app.route('/api/files').get(fileController.getAllFiles).post(fileController.createFiles);
	app.route('/api/files/:fileId').get(fileController.getSingleFile).delete(fileController.deleteSingleFile);
}