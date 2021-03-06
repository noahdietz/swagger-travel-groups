var should = require('chai').should,
  expect = require('chai').expect,
  request = require('request'),
  execFile = require('child_process').execFile,
  child, 
  userIDs = ['558c29c05d2857d4d92f698d','558c29c05d2857d4d92f698e'],
  planIDs = ['558c367986786123e7545395', '558c367986786123e7545396'],
  createrIDs = ['558c29d06536c4e7d974a1de','558c29d06536c4e7d974a1df'];

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

    it('should create the first user with the specified values', function(done){
          request.post({header:{'content-type':'application/json'}, url:'http://localhost:10010/user', 
            json:{
              name:'Noah Dietz',
              password:'abc123'
            }},
            function(err, res, body){
              expect(body).to.have.property('name');
              expect(body.name).to.equal('Noah Dietz');
              expect(body).to.have.property('id');
              expect(body).to.have.property('password');
              expect(body.password).to.equal('abc123');
              expect(body).to.have.property('plan_id');
              expect(body.plan_id).to.equal('0');
              expect(body).to.have.property('friends');
              expect(body.friends).to.have.length(0);
              done();
            });
        });

    // after(function(){
    //   child.kill();
    // });

    it('should create the second user with the specified values', function(done){
      request.post({header:{'content-type':'application/json'}, url:'http://localhost:10010/user', 
        json:{
          name:'Linjie Peng',
          password:'xyz456'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Linjie Peng');
        expect(body).to.have.property('id');
        expect(body).to.have.property('password');
        expect(body.password).to.equal('xyz456');
        expect(body).to.have.property('plan_id');
        expect(body.plan_id).to.equal('0');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(0);
        done();
      });
    });

    // getUserByID key-value testing
    it('should return the first user with keys and values', function(done){
      request('http://localhost:10010/user/'+userIDs[0],
        function(err, res, body){
          var json = JSON.parse(body);
          expect(json).to.have.property('name');
          expect(json.name).to.equal('Noah Dietz');
          expect(json).to.have.property('id');
          expect(json.id).to.equal(userIDs[0]);
          expect(json).to.have.property('plan_id');
          expect(json.plan_id).to.equal(planIDs[0]);
          expect(json).to.have.property('friends');
          expect(json.friends).to.have.length(0);
          done();
        });
    });

    it('should return the second user with keys and values', function(done){
      request('http://localhost:10010/user/'+userIDs[1],
      function(err, res, body){
        var json = JSON.parse(body);
        expect(json).to.have.property('name');
        expect(json.name).to.equal('Linjie Peng');
        expect(json).to.have.property('id');
        expect(json.id).to.equal(userIDs[1]);
        expect(json).to.have.property('plan_id');
        expect(json.plan_id).to.equal(planIDs[1]);
        expect(json).to.have.property('friends');
        expect(json.friends).to.have.length(0);
        done();
      });
    });

    //updateUser full update key value testing
    it('should update first user fully in one request', function(done){
      request.post({header:{'content-type':'application/json'}, 
        url:'http://localhost:10010/user/558c29d06536c4e7d974a1de', 
        json:{
          name:'Mohsen Azimi',
          password:'qrs789'
        }},
      function(err, res, body){
        expect(body).to.have.property('name');
        expect(body.name).to.equal('Mohsen Azimi');
        expect(body).to.have.property('password');
        expect(body.password).to.equal('qrs789');
        expect(body).to.have.property('plan_id');
        expect(body).to.have.property('id');
        expect(body.id).to.equal('558c29d06536c4e7d974a1de');
        expect(body).to.have.property('friends');
        expect(body.friends).to.have.length(11);
        done();
      });
    });

    // //updateUser partial (name) update key value testing
    // it('should update only the name of second user', function(done){
    //   request.post({header:{'content-type':'application/json'}, 
    //     url:'http://localhost:10010/user/'+userIDs[1], 
    //     json:{
    //       name:'Prabhat Jha'
    //     }},
    //   function(err, res, body){
    //     expect(body).to.have.property('name');
    //     expect(body.name).to.equal('Prabhat Jha');
    //     expect(body).to.have.property('id');
    //     expect(body.id).to.equal(userIDs[1]);
    //     expect(body).to.have.property('password');
    //     expect(body.password).to.equal('xyz456');
    //     expect(body).to.have.property('plan_id');
    //     expect(body.plan_id).to.equal('0');
    //     expect(body).to.have.property('friends');
    //     expect(body.friends).to.have.length(0);
    //     done();
    //   });
    // });

    // //updateUser partial (password) update key value testing
    // it('should update only the password of second user', function(done){
    //   request.post({header:{'content-type':'application/json'}, 
    //     url:'http://localhost:10010/user/'+userIDs[1], 
    //     json:{
    //       password:'api000'
    //     }},
    //   function(err, res, body){
    //     expect(body).to.have.property('name');
    //     expect(body.name).to.equal('Prabhat Jha');
    //     expect(body).to.have.property('id');
    //     expect(body.id).to.equal(userIDs[1]);
    //     expect(body).to.have.property('password');
    //     expect(body.password).to.equal('api000');
    //     expect(body).to.have.property('plan_id');
    //     expect(body.plan_id).to.equal('0');
    //     expect(body).to.have.property('friends');
    //     expect(body.friends).to.have.length(0);
    //     done();
    //   });
    // });

    // //updateUser partial (plan_id) update key value testing
    // it('should only update the plan_id of second user', function(done){
    //   request.post({header:{'content-type':'application/json'}, 
    //     url:'http://localhost:10010/user/'+userIDs[1], 
    //     json:{
    //       plan_id:'xyz91011abc'
    //     }},
    //   function(err, res, body){
    //     expect(body).to.have.property('name');
    //     expect(body.name).to.equal('Prabhat Jha');
    //     expect(body).to.have.property('id');
    //     expect(body.id).to.equal(userIDs[1]);
    //     expect(body).to.have.property('password');
    //     expect(body.password).to.equal('api000');
    //     expect(body).to.have.property('plan_id');
    //     expect(body.plan_id).to.equal('xyz91011abc');
    //     expect(body).to.have.property('friends');
    //     expect(body.friends).to.have.length(0);
    //     done();
    //   });
    // });

    // it('should only update the friends of second user', function(done){
    //   request.post({header:{'content-type':'application/json'}, 
    //     url:'http://localhost:10010/user/'+userIDs[1], 
    //     json:{
    //       friends:userIDs[0]
    //     }},
    //   function(err, res, body){
    //     expect(body).to.have.property('name');
    //     expect(body.name).to.equal('Prabhat Jha');
    //     expect(body).to.have.property('id');
    //     expect(body.id).to.equal(userIDs[1]);
    //     expect(body).to.have.property('password');
    //     expect(body.password).to.equal('api000');
    //     expect(body).to.have.property('plan_id');
    //     expect(body.plan_id).to.equal('xyz91011abc');
    //     expect(body).to.have.property('friends');
    //     expect(body.friends).to.have.length(1);
    //     done();
    //   });
    // });
  });

  
  /*-------- End of user path testing --------*/

  /*-------- Start of plan path testing --------*/
  describe('plan', function(){

    //addPlan test
    it('should create the first plan and update the creator', function(done){
      request.post({header:{'content-type':'application/json'},
      url:'http://localhost:10010/plan',
      json:{
        creater:createrIDs[0],
        depature:'9:00 am',
        destination:'San Francisco',
        origin:'San Jose'
      }},
      function(err, res, body){
        expect(body).to.have.property('creater');
        expect(body.creater).to.equal(createrIDs[0]);
        expect(body).to.have.property('depature');
        expect(body.depature).to.equal('9:00 am');
        expect(body).to.have.property('destination');
        expect(body.destination).to.equal('San Francisco');
        expect(body).to.have.property('origin');
        expect(body.origin).to.equal('San Jose');
        expect(body).to.have.property('group_member');
        expect(body.group_member).to.have.length(0);
        expect(body).to.have.property('id');
        done();
      });
    });

    it('should create the second plan and update the creator', function(done){
      request.post({header:{'content-type':'application/json'},
      url:'http://localhost:10010/plan',
      json:{
        creater:createrIDs[1],
        depature:'7:00 pm',
        destination:'New York City',
        origin:'Los Angeles'
      }},
      function(err, res, body){
        expect(body).to.have.property('creater');
        expect(body.creater).to.equal(createrIDs[1]);
        expect(body).to.have.property('depature');
        expect(body.depature).to.equal('7:00 pm');
        expect(body).to.have.property('destination');
        expect(body.destination).to.equal('New York City');
        expect(body).to.have.property('origin');
        expect(body.origin).to.equal('Los Angeles');
        expect(body).to.have.property('group_member');
        expect(body.group_member).to.have.length(0);
        expect(body).to.have.property('id');
        done();
      });
    });

    //getPlanByID key-value testing
    it('should get the plan of the first user', function(done){
      request.get('http://localhost:10010/user/'+userIDs[0]+'/plan',
        function(err, res, body){
          var json = JSON.parse(body);
          expect(json).to.have.property('id');
          expect(json).to.have.property('creater');
          expect(json.creater).to.equal(userIDs[0]);
          expect(json).to.have.property('depature');
          expect(json.depature).to.equal('9:00 am');
          expect(json).to.have.property('origin');
          expect(json.origin).to.equal('San Jose');
          expect(json).to.have.property('destination');
          expect(json.destination).to.equal('San Francisco');
          expect(json).to.have.property('group_member');
          expect(json.group_member).to.have.length(0);
          done();
        });
    });

    //updatePlanByID full update key value testing
    it('should edit all available fields for second user plan', function(done){
      request.post({header:{'content-type':'application/json'},
        url:'http://localhost:10010/user/'+userIDs[1]+'/plan',
        json:{
          depature:'11:00 am',
          origin:'London',
          destination:'Los Angeles'
        }},
        function(err, res, body){
          expect(body).to.have.property('id');
          // expect(body.id).to.equal(planIDs[1]);
          expect(body).to.have.property('creater');
          expect(body.creater).to.equal(userIDs[1]);
          expect(body).to.have.property('depature');
          expect(body.depature).to.equal('11:00 am');
          expect(body).to.have.property('origin');
          expect(body.origin).to.equal('London');
          expect(body).to.have.property('destination');
          expect(body.destination).to.equal('Los Angeles');
          expect(body).to.have.property('group_member');
          expect(body.group_member).to.have.length(1);          
          done();
        });
      });

    //getPlanUsers response length testing
    it('should return all IDs of users a part of first plan', function(done){
      request('http://localhost:10010/plan/'+planIDs[0]+'/users',
        function(err, res, body){
          var json = JSON.parse(body);
          expect(json).to.have.property('users');
          expect(json.users).to.have.length(1);
          expect(json.users[0]).to.equal(userIDs[0]);
          done();
        });
    });
   });
  /*-------- End of plan path testing --------*/
