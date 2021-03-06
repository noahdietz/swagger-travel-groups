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
	updateUser: updateUser,
	getPlanUsers: getPlanUsers
}

/* update the information of the plan by the userID */
function updatePlanByID(req, res) {
	var uid = req.swagger.params.id.value;
	var dep = req.body.depature;
	var dest = req.body.destination;
	var orig = req.body.origin;
	var gm = req.body.group_member;
	var tp = req.body.transportations;
	var userid;
	var pid;
	User.findById(uid, function(err, d) {
		userid = uid;
		Plan.findOne({'creater': userid}, function(err, doc) {
			pid = doc._id;
			if (dep !== "" && dep !== undefined) {
				doc.depature = dep;
			}
			if (dest !== "" && dest !== undefined) {
				doc.destination = dest;
			}
			if (orig !== "" && orig !== undefined) {
				doc.origin = orig;
			}
			if (gm !== "" && gm !== undefined) {
				doc.group_member.push(gm);
			}
			if (tp !== "" && tp !== undefined) {
				doc.transportations.push(tp);
			}
			doc.save();
			//if (dep !== undefined) {
			//	Plan.update(
			//		{_id: pid},
			//		{
			//			$set: {
			//				depature: dep
			//			}
			//		}, function(err, updated) {
			//			//err checking
			//		}
			//	);
			//}
			//if (dest !== undefined) {
			//	Plan.update(
			//		{_id: pid},
			//		{
			//			$set: {
			//				destination: dest
			//			}
			//		}, function(err, updated) {
			//			//err checking
			//		}
			//	);
			//}
			//if (orig !== undefined) {
			//	Plan.update(
			//		{_id: pid},
			//		{
			//			$set: {
			//				origin: orig
			//			}
			//		}, function(err, updated) {
			//			//err checking
			//		}
			//	);
			//}
			//if (gm !== undefined) {
			//	Plan.update(
			//		{_id: pid},
			//		{
			//			$addToSet: {
			//				group_member: gm
			//			}
			//		}, function(err, updated) {
			//			//err checking
			//		}
			//	);
			//}
			//if (tp !== undefined) {
			//	Plan.update(
			//		{_id: pid},
			//		{
			//			$addToSet: {
			//				transportations: tp
			//			}
			//		}, function(err, updated) {
			//			//err checking
			//		}
			//	);
			//}
			var id = doc._id;
			var creater = doc.creater;
			var depature = doc.depature;
			var destination = doc.destination;
			var origin = doc.origin;
			var group_member = doc.group_member;
			var transportations = doc.transportations;
			var plan = {
				"id": id,
				"creater": creater,
				"depature": depature,
				"destination": destination,
				"origin": origin,
				"group_member": group_member,
				"transportations": transportations
			};
			res.json(plan);

		});
	});

}

/* get the plan information by user ID */
function getPlanByID(req, res) {
	var id = req.swagger.params.id.value;
  User.findById(id, function(err, doc) {
  	var pid = doc.plan_id;
		Plan.findById(pid, function(err, doc) {
			var id = doc._id;
			var creater = doc.creater;
			var depature = doc.depature;
			var destination = doc.destination;
			var origin = doc.origin;
			var group_member = doc.group_member;
			var transportations = doc.transportation;
			var plan = {
				"id": id,
				"creater": creater,
				"depature": depature,
				"destination": destination,
				"origin": origin,
				"group_member": group_member,
				"transportations": transportations
			};
			res.json(plan);
		});
  });
}

/* get the user information by ID */
function getUserByID(req, res) {
  var id = req.swagger.params.id.value;
  User.findById(id, function(err, doc) {
	  var id = doc.id;
	  var name = doc.name;
	  var password = doc.password;
	  var plan_id = doc.plan_id;
	  var friends = doc.friends;
	  var user = {
		  "id": id,
		  "name": name,
		  "password": password,
		  "plan_id": plan_id,
		  "friends": friends
	  };
	  res.json(user);
  });
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

	User.update(
		{_id: who},
		{
			$set: {
				plan_id: planID
			}
		}, function(err, updated) {
			//err checking
		}
	);
	
	var id = newPlan._id;
	var creater = newPlan.creater;
	var depature = newPlan.depature;
	var destination = newPlan.destination;
	var origin = newPlan.origin;
	var group_member = newPlan.group_member;
	var transportations = newPlan.transportation;
	var plan = {
		"id": id,
		"creater": creater,
		"depature": depature,
		"destination": destination,
		"origin": origin,
		"group_member": group_member,
		"transportations": transportations
	};
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
	var id = newUser._id;
	var name = newUser.name;
	var password = newUser.password;
	var plan_id = newUser.plan_id;
	var friends = newUser.friends;
	var user = {
	  "id": id,
	  "name": name,
	  "password": password,
	  "plan_id": plan_id,
	  "friends": friends
	};
	res.json(user);
}

/* update the information of the user by userID */
function updateUser(req, res) {
	var id = req.swagger.params.id.value;
	var n = req.body.name;
	var pwd = req.body.password;
	var f = req.body.friends;
	User.findById(id, function(err, doc) {
		if (n !== "" && n !== undefined) doc.name = n;
		if (pwd !== "" && pwd !== undefined) doc.password = pwd;
		if (f !== "" && f != undefined) doc.friends.push(f);
		doc.save();


  	  var id = doc._id;
  	  var name = doc.name;
  	  var password = doc.password;
  	  var plan_id = doc.plan_id;
  	  var friends = doc.friends;
  	  var user = {
  		  "id": id,
  		  "name": name,
  		  "password": password,
  		  "plan_id": plan_id,
  		  "friends": friends
  	  };
  	  res.json(user);
		});

}

function getPlanUsers(req, res) {
	var id = req.swagger.params.plan_id.value;
  Plan.findById(id, function(err, doc) {
		var creater = doc.creater;
		var members = doc.group_member;
  	  members.push(creater);
  	  	var user = {
  		  "users": members
  	  };
  	  res.json(user);
  });
}