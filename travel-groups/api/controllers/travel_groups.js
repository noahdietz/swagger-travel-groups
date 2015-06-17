'use strict';

var util = require('util');


module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	addPlan: addPlan,
	createUser: createUser,
	updatePlanByID: updatePlanByID
}

function updatePlanByID(req, res) {
	var id = req.swagger.params.id.value;
	var creater = req.body.creater;
	var depature = req.body.depature;
	var destination = req.body.destination;
	var origin = req.body.origin;
	var group_member = req.body.group_member;
	var transportations = req.body.transportations
	var plan = {
		"id": 12345,
		"creater": creater,
		"group_member": [11,22],
		"transportations": [22,1223],
		"depature": depature,
		"destination": destination,
		"origin": origin,
	};
	res.json(plan);
}

function getPlanByID(req, res) {
	var id = req.swagger.params.id.value;
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
	var creater = req.body.creater;
	var depature = req.body.depature;
	var destination = req.body.destination;
	var origin = req.body.origin;
	var plan = {
		"id": 12345,
		"creater": creater,
		"group_member": [],
		"transportations": [],
		"depature": depature,
		"destination": destination,
		"origin": origin,
	};
	res.json(plan);
}

function createUser(req, res) {
	var name = req.body.name;
	var password = req.body.password;

	var user = {
		'name':name,
		'password':password,
		'id':12345,
		'plan_id': 0,
		'friends':[]
	};

	res.json(user);
}

function updateUser(req, res) {
	var id = req.swagger.params.id.value;
	var update = req.body.new_info;

	
}