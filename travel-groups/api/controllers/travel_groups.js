'use strict';

var util = require('util');


module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	createUser: createUser
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

function createUser(req, res) {
	var name = req.body.name;
	var password = req.body.password;

	var user = {
		'name':name,
		'password':password,
		'id':12345,
		'plan_id': 0,
		'friends':[]
	}

	res.json(user);
}