'use strict';

module.exports = Observer;

function Observer(next = () => {}, error = (error) => {throw error}, complete = () => {}) {
  const observer = {};
  switch (typeof(next)) {
    case 'function':
      observer.next = next;
      observer.error = error;
      observer.complete = complete;
      break;
    case 'object':
      observer.next = next.next || function() {};
      observer.error = next.error || function(error) {throw error};
      observer.complete = next.complete || function() {};
      break;
    default:
      break;
  }
  if (next instanceof Observer) {
    this._observer = next;
  } else {
    this._observer = observer;
  }
  this._subscribed = true;
}

Observer.prototype.next = function(value) {
  if (this._subscribed) {
    this._observer.next(value);
  }
}

Observer.prototype.error = function(error) {
  if (this._subscribed) {
    this._observer.error(error);
    this.unsubscribe();
  }
}

Observer.prototype.complete = function() {
  if (this._subscribed) {
    this._observer.complete();
    this.unsubscribe();
  }
}

Observer.prototype.unsubscribe = function() {
  this._subscribed = false;
}
