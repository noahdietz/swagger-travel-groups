module.exports = function() {
	switch (process.env.NODE_ENV) {
		case 'development':
			return {
				'url': 'mongodb://linjie:travelplan@ds027738.mongolab.com:27738/travel_plan'
			}
		 case 'production': 
			return {
				'url': 'mongodb://elsa:travelplan@ds029630.mongolab.com:29630/travel_plan_production'
			}
		default: 
			return {
				'url': 'mongodb://linjie:travelplan@ds027738.mongolab.com:27738/travel_plan'
			}
	}
}



















//
// var mongodb = require('mongondb');
// var uri1 = 'mongodb://linjie:travelplan@ds027738.mongolab.com:27738/travel_plan'
// var uri2 = 'mongodb://elsa:travelplan@ds029630.mongolab.com:29630/travel_plan_production'
//
// app.configure('development', function() {
// 	mongodb.MongoClient.connect(uri1, function(err, db) {
// 		if(err) throw err;
//
// 		var users = db.collection('users');
// 		var plans = db.collection('plans');
// 		var transportations = db.collection('transportations');
// 		db.counters.insert(
// 			{
// 				_id: 'userid';
// 				seq: 0
// 			}
// 		);
// 		db.counters2.insert(
// 			{
// 				_id: 'planid';
// 				seq: 0
// 			}
// 		);
// 	});
// });
//
//
// app.configure('production', function () {
// 	mongodb.MongoClient.connect(uri2, function(err, db) {
// 		if(err) throw err;
//
// 		var users = db.collection('users');
// 		var plans = db.collection('plans');
// 		var transportations = db.collection('transportations');
// 		db.counters.insert(
// 			{
// 				_id: 'userid';
// 				seq: 0
// 			}
// 		);
// 		db.counters2.insert(
// 			{
// 				_id: 'planid';
// 				seq: 0
// 			}
// 		);
// 	});
// });