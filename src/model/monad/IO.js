/**
 * IO Monad class
 * Author: Luis Atencio
 */
import isFunction from 'lodash/fp/isFunction';

exports.IO = class IO {

  constructor(effect) {
    if (!isFunction(effect)) {
      throw 'IO Usage: function required';
    }
    this.effect = effect;
  }

  static of(a) {
    return new exports.IO( () => a );
  }

  static from(fn) {
    return new exports.IO(fn);
  }

  map(fn) {
    const self = this;
    return new exports.IO(function () {
      return fn(self.effect());
    });
  }

   chain(fn) {
    return fn(this.effect());
  }

  run() {
    return this.effect();
  }
};
