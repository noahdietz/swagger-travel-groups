var should = require('chai').should,
  expect = require('chai').expect,
  request = require('request'),
  execFile = require('child_process').execFile,
  child, 
  userIDs = [],
  planIDs = [];

  /*-------- Start of user path testing --------*/
  describe('user', function(){
    //createUser key-value testing

    // before(function(){
    //   child = execFile('app.js', function (error, stdout, stderr) {
    //               //console.log('stdout: ' + stdout);
    //               //console.log('stderr: ' + stderr);
    //               if (error !== null) {
    //                 console.log('exec error: ' + error);
    //               }
    //           });
    // });
    
    it('should create the first user with the specified values', function(){
          request.post({header:{'content-type':'application/json'}, url:'http://localhost:10010/user', 
            json:{
              name:'Noah Dietz',
              password:'abc123'
            }},
            function(err, res, body){
              expect(body).to.have.property('name');
              expect(body.name).to.equal('Noah Dietz');
              expect(body).to.have.property('id');
              userIDs.push(body.id);
              expect(userIDs).to.have.length(1);
              expect(body).to.have.property('password');
              expect(body.password).to.equal('abc123');
              expect(body).to.have.property('plan_id');
              expect(body.plan_id).to.equal('0');
              expect(body).to.have.property('friends');
              expect(body.friends).to.have.length(0);
              // done();
            });
        });

    // after(function(){
    //   child.kill();
    // });

    it('should create the second user with the specified values', function(){
      request.post({header:{'content-type':'application/json'}, url:'http://localhost:10010/user', 
        json:{
          name:'Linjie Peng',
          password:'xyz456'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Linjie Peng');
        expect(body).to.have.property('id');
        userIDs.push(body.id);
        expect(userIDs).to.have.length(2);
        expect(body).to.have.property('password');
        expect(body.password).to.equal('xyz456');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('0');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(0);
        // done();
      });
    });

    // getUserByID key-value testing
    it('should return the first user with keys and values', function(){
      request('http://localhost:10010/user/'+userIDs[0],
        function(err, res, body){
          var json = JSON.parse(body);
          expect(json).to.have.property('name');
          expect(json.name).to.equal('Noah Dietz');
          expect(json).to.have.property('id');
          expect(json.id).to.equal(userIDs[0]);
          expect(json).to.have.property('plan_id');
          expect(json.plan_id).to.equal('0');
          expect(json).to.have.property('friends');
          expect(json.friends).to.have.length(0);
          // done();
        });
    });

    it('should return the second user with keys and values', function(){
      request('http://localhost:10010/user/'+userIDs[1],
      function(err, res, body){
        var json = JSON.parse(body);
        expect(json).to.have.property('name');
        expect(json.name).to.equal('Linjie Peng');
        expect(json).to.have.property('id');
        expect(json.id).to.equal(userIDs[1]);
        expect(json).to.have.property('plan_id');
        expect(json.plan_id).to.equal('0');
        expect(json).to.have.property('friends');
        expect(json.friends).to.have.length(0);
        // done();
      });
    });

    //updateUser full update key value testing
    it('should update first user fully in one request', function(){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/'+userIDs[0], 
        json:{
          name:'Mohsen Azimi',
          password:'qrs789',
          plan_id:'abc12345kjdf',
          friends:userIDs[1]
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Mohsen Azimi');
        expect(body).to.have.property('password');
        expect(body.password).to.equal('qrs789');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('abc12345kjdf');
        expect(body).to.have.property('id');
        expect(body.id).to.equal(userIDs[0]);
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(1);
        // done();
      });
    });

    //updateUser partial (name) update key value testing
    it('should update only the name of second user', function(){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/'+userIDs[1], 
        json:{
          name:'Prabhat Jha'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Prabhat Jha');
        expect(body).to.have.property('id');
        expect(body.id).to.equal(userIDs[1]);
        expect(body).to.have.property('password');
        expect(body.password).to.equal('xyz456');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('0');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(0);
        // done();
      });
    });

    //updateUser partial (password) update key value testing
    it('should update only the password of second user', function(){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/'+userIDs[1], 
        json:{
          password:'api000'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Prabhat Jha');
        expect(body).to.have.property('id');
        expect(body.id).to.equal(userIDs[1]);
        expect(body).to.have.property('password');
        expect(body.password).to.equal('api000');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('0');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(0);
        // done();
      });
    });

    //updateUser partial (plan_id) update key value testing
    it('should only update the plan_id of second user', function(){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/'+userIDs[1], 
        json:{
          plan_id:'xyz91011abc'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Prabhat Jha');
        expect(body).to.have.property('id');
        expect(body.id).to.equal(userIDs[1]);
        expect(body).to.have.property('password');
        expect(body.password).to.equal('api000');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('xyz91011abc');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(0);
        // done();
      });
    });

    it('should only update the friends of second user', function(){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/'+userIDs[1], 
        json:{
          friends:userIDs[0]
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Prabhat Jha');
        expect(body).to.have.property('id');
        expect(body.id).to.equal(userIDs[1]);
        expect(body).to.have.property('password');
        expect(body.password).to.equal('api000');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('xyz91011abc');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(1);
        // done();
      });
    });
  });

  
  /*-------- End of user path testing --------*/

  /*-------- Start of plan path testing --------*/
  describe('plan', function(){

    //addPlan test
    it('should create a new plan and update the creator', function(){
      request.post({header:{'content-type':'application/json'},
      url:'http://localhost:10010/path'},
      json:{
        creater:userIDs[0],
        
      })
    });
/*
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
    */
  });
  /*-------- End of plan path testing --------*/
