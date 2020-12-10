'use strict';

const Iterator = require('./Iterator');
const Observable = require('./Observable');

const array = [1, 2, 3, 4];

const iterator = new Iterator(array);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

const obA = new Observable(observer => {
  observer.next('a');
  observer.next('b');
  observer.next('c');
  observer.next('d');
});

const observer = {
	next: function(value) {
		console.log(value);
	},
	error: function(error) {
		console.log(error)
	},
	complete: function() {
		console.log('complete')
	}
}

const obB = obA.map(x => x.toUpperCase());

obA.subscribe(observer);

obB.subscribe(observer);
