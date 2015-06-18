'use strict';

var util = require('util');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var Config = require('./config');
var conf = new Config();
var User;
var Plan;
var Trans;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };  

var mongodbUri = conf.url;

var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	
	//create user schema
	var userSchema = mongoose.Schema({
		name: String,
		password: String,
		plan_id: String,
		friends: [String]
	});
	
	var planSchema = mongoose.Schema({
		creater: String,
		depature: String,
		destination: String,
		origin: String,
		group_member: [String],
		transportations: [String]
	});
	
	var transportationSchema = mongoose.Schema({
		arrival: String,
		intr_places: String,
		which_method: String
	});
	
	User = mongoose.model('users', userSchema);
	Plan = mongoose.model('plans', planSchema);
	Trans = mongoose.model('transportations', transportationSchema);
});

module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	addPlan: addPlan,
	createUser: createUser,
	updatePlanByID: updatePlanByID,
	updateUser: updateUser
}

/* update the information of the user */
function updatePlanByID(req, res) {
	var uid = req.swagger.params.id.value;
	var dep = req.body.depature;
	var dest = req.body.destination;
	var orig = req.body.origin;
	var gm = req.body.group_member;
	var tp = req.body.transportations
	var username;
	var pid;
	User.findById(uid, function(err, doc) {
		username = doc.name;
		Plan.findOne({'creater': username}, function(err, doc) {
			pid = doc._id;
			console.log("############");
			console.log(username);
			console.log(pid);
			console.log("############");
			if (dep != "") {
				Plan.update(
					{_id: pid},
					{
						$set: {
							depature: dep
						}
					}, function(err, updated) {
						//err checking
					}
				);
			}
			if (dest != "") {
				Plan.update(
					{_id: pid},
					{
						$set: {
							destination: dest
						}
					}, function(err, updated) {
						//err checking
					}
				);
			}
			if (orig != "") {
				Plan.update(
					{_id: pid},
					{
						$set: {
							origin: orig
						}
					}, function(err, updated) {
						//err checking
					}
				);
			}
			if (gm != "") {
				Plan.update(
					{_id: pid},
					{
						$addToSet: {
							group_member: gm
						}
					}, function(err, updated) {
						//err checking
					}
				);
			}
			if (tp != "") {
				Plan.update(
					{_id: pid},
					{
						$addToSet: {
							transportations: tp
						}
					}, function(err, updated) {
						//err checking
					}
				);
			}
			var plan = util.format('A plan has been updated!/n');
			res.json(plan);
		
		});
	});
	
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
	
	var newPlan = new Plan({
		creater: who, 
		depature: dep, 
		group_member: [],
		transportation: [],
		destination: dest,
		origin: orig
	});
	
	newPlan.save();
	
	var planID = newPlan._id;
	
	console.log("#####");
	console.log(planID);
	
	User.update(
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
	
	var newUser = new User({
		name: n,
		password: pwd,
		plan_id: 0,
		friends:[]
	});
	
	newUser.save();
	
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