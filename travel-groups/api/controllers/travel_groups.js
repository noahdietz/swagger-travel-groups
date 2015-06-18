'use strict';

var util = require('util');


module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	addPlan: addPlan,
	createUser: createUser,
	updatePlanByID: updatePlanByID,
	updateUser: updateUser,
	getPlanUsers: getPlanUsers
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

	var user = {
		'name':req.body.name != "" ? req.body.name:"John Doe",
		'password':req.body.password != "" ? req.body.password:"abc123",
		'id':id,
		'plan_id':req.body.plan_id != "" ? req.body.plan_id:"127",
		'friends':[1,2,7]
	};

	res.json(user);
}

function getPlanUsers(req, res) {
	var plan_id = req.swagger.params.plan_id.value;

	var users = {'users':[
		{
			'name':'John Doe',
			'password':'test1234',
			'id':101,
			'plan_id':1234567,
			'friends':[127, 721]
		},
		{
			'name':'Jane Smith',
			'password':'1234test',
			'id':127,
			'plan_id':10010,
			'friends':[101, 721]
		},
		{
			'name':'Ricky Bobby',
			'password':'abcdefg',
			'id':721,
			'plan_id':3000,
			'friends':[101, 127]
		}]};

	res.json(users);
}