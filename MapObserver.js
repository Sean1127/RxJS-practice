'use strict';

const Observer = require('./Observer');

module.exports = MapObserver;

function MapObserver(observer, callback) {
  Observer.call(this, observer);
  this._callback = callback;
}

MapObserver.prototype = Object.create(Observer.prototype);

MapObserver.prototype.next = function(value) {
  this._observer.next(this._callback(value));
}
