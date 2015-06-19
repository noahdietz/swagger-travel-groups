[![Build Status](https://travis-ci.org/noahdietz/swagger-travel-groups.svg?branch=travis_branch)](https://travis-ci.org/noahdietz/swagger-travel-groups)

# swagger-travel-groups
by Noah Dietz and Linje Peng

Travel Groups is a group travel planning application that allows its users to create travel plans,
invite their friends to travel with them and determine the optimal mode of transportation for their
trip. 

This is strictly an API defined in Swagger. The controllers are implemented to return mock data or input depending on the operation called.

## swagger-ui
In order to view the Travel Groups API, start the project by running the following command in the travel-groups directory:
	
	npm start

Then, in your browser, navigate to the following url:

	http://localhost:10010/docs

This will open the Travel Groups API for viewing.

## travel-groups testing

The testing stack is made up of [Mocha](http://mochajs.org/#running-mochas-tests), [Chai](http://chaijs.com) and [SuperTest](https://www.npmjs.com/package/supertest)

In order to run the testing suite for the Travel Groups API, run the following command:
	
	npm test

The following output is the result of the all the test files.

## Travis CI


This project is also hosted on Travis CI for repository test coverage.

