//createing the emitterMixin
const eventEmitterMixin = (Superclass) =>
  class extends Superclass {
    constructor(...args) {
      super(...args);
      this._events = {};
    }

    on(eventName, listener, maybe = false) {
      if (typeof eventName !== "string") {
        throw new Error("eventName must be a string");
      }

      if (typeof listener !== "function") {
        throw new Error("listner must be a function");
      }

      this._events[eventName] = this._events[eventName] || [];
      const listeners = maybe ? "maybes" : "confirmed";
      this._events[eventName][listeners] =
        this._events[eventName][listeners] || [];
      this._events[eventName][listeners].push(listener);
    }
  };


  const gameWeekone = {}
  gameWeekone[scores] = gameWeekone[scores] || []
  gameWeekone[scores][score] = gameWeekone[scores][score] 
  gameWeekone[scores][score].push(score)
