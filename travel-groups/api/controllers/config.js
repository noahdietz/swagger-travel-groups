var dotenv = require('dotenv');
dotenv.load();

module.exports = function() {
	switch (process.env.NODE_ENV) {
		case 'development':
			return {
				'url': process.env.DB_URL
			}
		 case 'production': 
			return {
				'url': process.env.DB_URL
			}
		default: 
			return {
				'url': process.env.DB_URL
			}
	}
}









