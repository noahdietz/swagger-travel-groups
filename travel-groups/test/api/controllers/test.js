var should = require('chai').should,
  expect = require('chai').expect,
  supertest = require('supertest'),
  app = require('../../../app'), //serves API for testing
  api = supertest('http://localhost:10010'); //url for requests

  /*-------- Start of user path testing --------*/
  describe('user', function(){
    //getUserByID key-value testing
    it('should return an object with keys and values', function(done){
      api.get('/user/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(1);
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(1234567);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(0);
        done();
      });
    });

    //createUser key-value testing
    it('should create a new user with the specified values', function(done){
      api.post('/user')
      .set('Accept', 'application/json')
      .send({
        name:'Noah Dietz',
        password:'a1b2c3'
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Noah Dietz');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(12345);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('a1b2c3');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(0);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(0);
        done();
      });
    });

    //getPlanByID key-value testing
    it('should return the plan of the specified user', function(done){
      api.get('/user/127/plan')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(11111);
        expect(res.body).to.have.property('creater');
        expect(res.body.creater).to.equal(127);
        expect(res.body).to.have.property('depature');
        expect(res.body.depature).to.equal('3:00 pm');
        expect(res.body).to.have.property('origin');
        expect(res.body.origin).to.equal('San Jose');
        expect(res.body).to.have.property('destination');
        expect(res.body.destination).to.equal('San Francisco');
        expect(res.body).to.have.property('group_member');
        expect(res.body.group_member).to.have.length(0);
        expect(res.body).to.have.property('transportations');
        expect(res.body.transportations).to.have.length(0);
        done();
      });
    });

    //updateUser full update key value testing
    it('should reflect the full changes specified in request', function(done){
      api.post('/user/300')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
          name:'Noah Dietz',
          password:'haon4321',
          plan_id:321
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Noah Dietz');
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('haon4321');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(321);
        done();
      });
    });

    //updateUser partial (name) update key value testing
    it('should reflect the name change specified in the request', function(done){
      api.post('/user/300')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        name:'Jim Smith',
        password:'',
        plan_id:0
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Jim Smith');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(300);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('abc123');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(127);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(3);
        done();
      });
    });

    //updateUser partial (password) update key value testing
    it('should reflect the password change specified in the request', function(done){
      api.post('/user/300')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        name:'',
        password:'zyxw',
        plan_id:0
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(300);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('zyxw');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(127);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(3);
        done();
      });
    });

    //updateUser partial (plan_id) update key value testing
    it('should reflect the password change specified in the request', function(done){
      api.post('/user/300')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        name:'',
        password:'',
        plan_id:999
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(300);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('abc123');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(999);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(3);
        done();
      });
    });

    //updatePlanByID full update key value testing
    it('plan should relfect full changes specified in request', function(done){
      api.post('/user/123/plan')
      .set('Accept', 'application/json')
      .send({
        creater:321,
        depature:'2:23pm',
        destination:'San Jose',
        origin:'San Francisco',
        group_member:1,
        transportations:2
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(12345);
        expect(res.body).to.have.property('creater');
        expect(res.body.creater).to.equal(321);
        expect(res.body).to.have.property('depature');
        expect(res.body.depature).to.equal('2:23pm');
        expect(res.body).to.have.property('origin');
        expect(res.body.origin).to.equal('San Francisco');
        expect(res.body).to.have.property('destination');
        expect(res.body.destination).to.equal('San Jose');
        expect(res.body).to.have.property('group_member');
        expect(res.body.group_member).to.have.length(2);
        expect(res.body).to.have.property('transportations');
        expect(res.body.transportations).to.have.length(2);
        done();
      });
    });
  });

  
  /*-------- End of user path testing --------*/

  /*-------- Start of plan path testing --------*/
  describe('plan', function(){

    //addPlan test
    it('should return 200 with key values', function(done){
      api.post('/plan')
      .set('Accept', 'application/json')
      .send({
        creater:127,
        origin:'San Jose',
        destination:'San Francisco',
        depature:'9:00am'
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(12345);
        expect(res.body).to.have.property('creater');
        expect(res.body.creater).to.equal(127);
        expect(res.body).to.have.property('depature');
        expect(res.body.depature).to.equal('9:00am');
        expect(res.body).to.have.property('origin');
        expect(res.body.origin).to.equal('San Jose');
        expect(res.body).to.have.property('destination');
        expect(res.body.destination).to.equal('San Francisco');
        expect(res.body).to.have.property('group_member');
        expect(res.body.group_member).to.have.length(0);
        expect(res.body).to.have.property('transportations');
        expect(res.body.transportations).to.have.length(0);
        done();
      })
    });

    //getPlanUsers response length testing
    it('should return all users a part of specified plan', function(done){
      api.get('/plan/127/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('users');
        expect(res.body.users).to.have.length(3);
        done();
      });
    });
  });
  /*-------- End of plan path testing --------*/
