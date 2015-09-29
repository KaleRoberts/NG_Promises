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
		.then(function(string) {
			console.log(string);
		}, function (error) {		// This is the second parameter of the then() method. It's an optional error handling callback function that is called iff the promise is rejected.
			console.error(error);
		})
		.then(function() {	// Mutliple callback functions can be registered to the same promise object by amking different calls to the then() method.
			console.log("This is another new promise resolution of the getData function");	// Functions are executed in the order that they are registered. 
		})	// So  regardless of if the first promise is resolved or not we will get this second one saying, "This is another promise resolution"
		.finally(function() {	// The finally() method is executed regardless of whether or not the success or error callbacks were invoked. 
			console.log('Finished at: ', new Date());	// This can be used to reset a form or something to a pristine state. (Angular has a pristine state for forms I think actually)
		})
	});

}());