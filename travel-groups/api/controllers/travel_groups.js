'use strict';

var util = require('util');
var mongodb = require('mongodb');
var Config = require('./config');
var conf = new Config();
var users;
var plans;
var transportations;

console.log("########");
console.log(conf.url);
console.log(process.env.NODE_ENV);

mongodb.MongoClient.connect(conf.url, function(err, db) {
	if(err) throw err;

	users = db.collection('users');
	plans = db.collection('plans');
	transportations = db.collection('transportations');
});


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

/* when you post a request /plan, a plan object will be created */
function addPlan(req, res) {
	var who = req.body.creater;
	var dep = req.body.depature;
	var dest = req.body.destination;
	var orig = req.body.origin;
	plans.insert(
		{
			creater: who,
			depature: dep,
			group_member: [],
			transportations: [],
			destination: dest,
			origin: orig
			
		}, function(err, inserted) {
			//err checking
		}
	);
	var myCursor = plans.find().limit(1).sort({$natural: -1});
	console.log(myCursor);
	var myDocument = myCursor.hasNext() ? myCursor.next() : null;
	var planID;
	if (myDocument) {
		planID = myDocument._id;
		console.log(planID);
	}
	users.update(
		{name: who},
		{
			$set: {
				plan_id: planID
			}
		}, function(err, updated) {
			//err checking
		}
	);
	var plan = util.format('A plan has been created!/n');
	res.json(plan);
}

/* when you post a request, a user object will be created */
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