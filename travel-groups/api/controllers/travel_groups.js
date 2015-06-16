'use strict';

var util = require('util');

module.exports = {
	getUserByID: getUserByID
}

function getUserByID(req, res) {
  var id = req.swagger.params.id.value;
  var user = {
  	'name':'John Doe',
  	'id':id,
  	'plan_id':1234567,
  	'friends':[]
  };

  res.json(user);
}