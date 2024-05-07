import _private from "./privateMethods.js";

const module = {
  ayoFaced({ val, run, jump, callback }) {
    _private.set(val);
    _private.get();

    if (run) {
      _private.run();
    }
    if (jump) {
      _private.jump();
    }

    if (callback) {
      callback(_private.get()); // Pass the current value
    }
  },
};
export default module;
