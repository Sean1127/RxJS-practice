'use strict';

const Observer = require('./Observer');
const MapObserver = require('./MapObserver');

module.exports = Observable;

function Observable(subscriber) {
  this._subscriber = subscriber;
}

Observable.prototype.subscribe = function() {
  const observer = new Observer(...arguments);
  if (this.operator) {
    this.operator(observer, this.source);
  } else {
    this._subscriber(observer);
  }
  return observer;
}

Observable.prototype.map = function(callback) {
  const observable = new Observable();
  observable.source = this;
  observable.operator = (observer, source) => {
    const mapObserver = new MapObserver(observer, callback);
    this._subscriber(mapObserver);
  };
  return observable;
}

Observable.create = function(subscriber) {
  return new Observable(subscriber);
}

Observable.fromArray = function(array) {
  return new Observable(observer => {
    try {
      array.forEach(value => observer.next(value));
      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  });
}
