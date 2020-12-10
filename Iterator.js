'use strict';

module.exports = Iterator;

function Iterator(array) {
  this.array = array;
  this.index = 0;
}

Iterator.prototype.next = function() {
  const value = this.array[this.index];
  const done = (this.index < this.array.length) ? false : true;
  this.index += 1;
  return { value, done };
}
