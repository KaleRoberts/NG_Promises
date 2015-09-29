(function () {
	"use strict";
	var app = angular.module('promiseApp', []);

	// Maybe think about creating a controller here.

	function getData($timeout, $q) {	// Using Angular's $timeout service to simulate asynchronous function
		return function() {				// AJAX calls using the $http service are some of the most common scenarios where promises are used.
		var defer = $q.defer();
		// Simulating asynchronous functionality 
		$timeout(function() {
			var x = Math.round(Math.random());		// This is just true/false checking. Math.round will return a random number between 0(inclusive) and 1 (exclusive)
			if (x) {								// So we use Math.round to round up or down to 1 and 0 respectively.
				defer.resolve('data received!' + x);	
			} else {
				defer.reject('An error occurred! Try again?' +x);
			}
		}, 2000)
		return defer.promise;
		}
	};

	app.factory('getData', getData);
	
	app.run(function(getData) {
		var promise = getData()
		.then(function(string) {
			console.log(string);
		}, function (error) {		// This is the second parameter of the then() method. It's an optional error handling callback function that is called iff the promise is rejected.
			console.error(error);
		})
		.then(function() {	// Mutliple callback functions can be registered to the same promise object by amking different calls to the then() method.
			console.log("This is another promise resolution");	// Functions are executed in the order that they are registered. 
		})	// So  regardless of if the first promise is resolved or not we will always get this second one saying, "This is another promise resolution"

	});

}());