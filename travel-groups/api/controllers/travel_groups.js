'use strict';

var util = require('util');


module.exports = {
	getUserByID: getUserByID,
	getPlanByID: getPlanByID,
	addPlan: addPlan
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
	var id = req.body.id;
	var creater = req.body.creater;
	var group_member = req.body.group_member;
	var transportations = req.body.transportations;
	var depature = req.body.depature;
	var destination = req.body.destination;
	var origin = req.body.origin;
	var plan = {
		"id": id,
		"creater": creater,
		"group_member": group_member,
		"transportations": transportations,
		"depature": depature,
		"origin": origin,
		"plan": plan
	};
	res.json(plan);
}