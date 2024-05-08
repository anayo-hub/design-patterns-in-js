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
        throw new Error("listener must be a function");
      }
      // Added 'maybe' option
      this._events[eventName] = this._events[eventName] || [];

      // Separate lists for 'yes' and 'maybe' RSVPs
      const listeners = maybe ? "maybes" : "confirmed";
      this._events[eventName][listeners] =
        this._events[eventName][listeners] || [];

      this._events[eventName][listeners].push(listener);
    }

    off(eventName, listener) {
      if (this._events[eventName]) {
        for (const status of ["confirmed", "maybes"]) {
          // Iterate over both RSVP types
          if (this._events[eventName][status]) {
            const index = this._events[eventName][status].indexOf(listener);

            if (index !== -1) {
              this._events[eventName][status].splice(index, 1); // Remove

              // If no more listeners in this category, cleanup
              if (this._events[eventName][status].length === 0) {
                delete this._events[eventName][status];
              }

              // If no one is listening to the event at all, cleanup
              if (Object.keys(this._events[eventName]).length === 0) {
                delete this._events[eventName];
              }
            }
          }
        }
      }
    }

    trigger(eventName, ...args) {
      ["confirmed", "maybes"].forEach((status) => {
        // Trigger for both lists
        if (this._events[eventName] && this._events[eventName][status]) {
          this._events[eventName][status].forEach((listener) =>
            listener(...args)
          );
        }
      });
    }

    sendReminder(eventName, reminderTime) {
      setTimeout(() => {
        console.log(`Reminder: ${eventName} is happening soon!`);
        this.trigger(eventName);
      }, reminderTime);
    }
  };

// --- Example Usage ---
class MyClass {
  constructor(name) {
    this.name = name;
  }
}

class MyClassWithEvents extends eventEmitterMixin(MyClass) {}

let party = new MyClassWithEvents("Graduation Party");

party.on("Graduation Party", () => console.log("Let's Celebrate!"));
party.on("Graduation Party", () => console.log("Might make it"), true); // 'maybe'
party.sendReminder("Graduation Party", 5000);
