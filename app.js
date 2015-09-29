(function () {
	"use strict";
	var app = angular.module('promiseApp', []);

	// Maybe think about creating a controller here.

	function getData($timeout, $q) {	// Using Angular's $timeout service to simulate asynchronous function
		return function() {				// AJAX calls using the $http service are some of the most common scenarios where promises are used.
		// Still simulated async 
		return $q(function(resolve, reject) {
			$timeout(function() {		// This is just true/false checking. Math.round will return a random number between 0(inclusive) and 1 (exclusive)
				resolve(Math.floor(Math.random() * 10));
			}, 2000);
		});
		};
	};

	app.factory('getData', getData);
	
	app.run(function(getData) {
		var promise = getData()
			.then(function(num) {
				console.log(num);
				return num * 2;		// This is deomonstrating promise chaining. I'm return something from the first promise callback and then using in a subsequent callback.
			})						// Functions can be returned from promise callbacks, you could return a new promise as well.
									// The promise chain "pauses" until the returned promise resolves, allowing chaining of multiple async function calls.
			.then(function(num) {
				console.log(num); // Which will be the random number from getData and the first promise resolution multiplied by 2
			})
	});

}());