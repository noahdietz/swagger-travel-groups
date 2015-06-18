'use strict';

var util = require('util');
var mongodb = require('mongodb');
var Config = require('./config');
var conf = new Config();
var users;
var plans;
var transportations;
var counters1; 
var counters2;

mongodb.MongoClient.connect(conf.url, function(err, db) {
	if(err) throw err;

	users = db.collection('users');
	plans = db.collection('plans');
	transportations = db.collection('transportations');
	// counters1 = db.collection('counters1');
// 	counters2 = db.collection('counters2');
// 	counters1.insert(
// 		{
// 			_id: 'userid',
// 			seq: 0
// 		}
// 		, function(err, inserted) {
// 			//err checking
// 		});
// 	counters2.insert(
// 		{
// 			_id: 'planid',
// 			seq: 0
// 		}
// 		, function(err, inserted) {
// 			//err checking
// 		});
});

// function getNextSequence(name) {
// 	var ret = counters1.findAndModify(
// 		{
// 			query: {_id: name},
// 			update: {$inc: {seq: 1}},
// 			new: true
// 		}
// 	);
// 	return ret.seq;
// };
//
// function getNextSequence2(name) {
// 	var ret = counters2.findAndModify(
// 		{
// 			query: {_id: name},
// 			update: {$inc: {seq: 1}},
// 			new: true
// 		}
// 	);
// 	return ret.seq;
// };

module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	addPlan: addPlan,
	createUser: createUser,
	updatePlanByID: updatePlanByID,
	updateUser: updateUser
}

function updatePlanByID(req, res) {
	var uid = req.swagger.params.id.value;
	var id = users.find({_id: uid})
	var dep = req.body.depature;
	var dest = req.body.destination;
	var orig = req.body.origin;
	var gm = req.body.group_member;
	var tp = req.body.transportations
	if (dep != "") {
		plans.update(
			{_id: id},
			{
				$set: {
					depature: dep
				}
			}
		);
	}
	if (dest != "") {
		plans.update(
			{_id: id},
			{
				$set: {
					destination: dest
				}
			}
		);
	}
	if (orig != "") {
		plans.update(
			{_id: id},
			{
				$set: {
					origin: orig
				}
			}
		);
	}
	if (gm != "") {
		plans.update(
			{_id: id},
			{
				$addToSet: {
					group_member: gm
				}
			}
		);
	}
	if (tp != "") {
		plans.update(
			{_id: id},
			{
				$addToSet: {
					transportation: tp
				}
			}
		);
	}
	// var plan = {
// 		"id": 12345,
// 		"creater": creater,
// 		"group_member": [11,22],
// 		"transportations": [22,1223],
// 		"depature": depature,
// 		"destination": destination,
// 		"origin": origin,
// 	};
	var plan = util.format('A plan has been updated!/n');
	res.json(plan);
}

function getPlanByID(req, res) {
	var id = req.swagger.params.id.value;
	var who = plans.find({})
	var plan = {
		"id": 11111,
		"creater": id,
		"group_member": [],
		"transportations": [],
		"depature": "3:00 pm",
		"destination": "San Francisco",
		"origin": "San Jose"
	};
	res.json(plan);
}

function getUserByID(req, res) {
  var id = req.swagger.params.id.value;
  var user = {
  	'name':'John Doe',
  	'password':'test1234',
  	'id':id,
  	'plan_id':1234567,
  	'friends':[]
  };

  res.json(user);
}

function addPlan(req, res) {
	var who = req.body.creater;
	var dep = req.body.depature;
	var dest = req.body.destination;
	var orig = req.body.origin;
	var planID = getNextSequence2('planid');
	plans.insert(
		{
			_id: planID,
			creater: who,
			depature: dep,
			group_member: [],
			transportations: [],
			destination: dest,
			origin: origin
			
		}
	);
	users.update(
		{_id: who},
		{
			$set: {
				plan_id: planID
			}
		}
	);
	// var plan = {
// 		"id": 12345,
// 		"creater": creater,
// 		"group_member": [],
// 		"transportations": [],
// 		"depature": depature,
// 		"destination": destination,
// 		"origin": origin,
// 	};
	var plan = util.format('A plan has been created!/n');
	res.json(plan);
}

function createUser(req, res) {
	var n = req.body.name;
	var pwd = req.body.password;
	
	users.insert(
		{
			name: n,
			password: pwd,
		    plan_id: 0,
			friends: []
			
		}
	, function(err, inserted) {
		// err checking
	})

	// var user = {
// 		'name':n,
// 		'password':pwd,
// 		'id':12345,
// 		'plan_id': 0,
// 		'friends':[]
// 	};
	var user = util.format('A user has been created!/n');
	res.json(user);
}

function updateUser(req, res) {
	var id = req.swagger.params.id.value;

	var user = {
		'name':req.body.name != "" ? req.body.name:"John Doe",
		'password':req.body.password != "" ? req.body.password:"abc123",
		'id':id,
		'plan_id':req.body.plan_id != "" ? req.body.plan_id:"127",
		'friends':[1,2,7]
	};

	res.json(user);
}