const withAuth = require('./../../middleware');

module.exports = (app) => {
	app.get('/api/dashboard', withAuth, function (req, res) {
		res.send('The password is potato');
	});
}