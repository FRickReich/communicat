const withAuth = require('./../../middleware');

module.exports = (app) =>
{
	app.get('/api/checkToken', withAuth, function (req, res)
	{
		res.sendStatus(200);
	});
}
