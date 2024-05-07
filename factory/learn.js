const addMyEvent = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn);
  } else {
    el[`on${ev}`] = fn;
  }
};

let myButton = document.getElementById("myButton");
let myEl = document.getElementById("myEl");

addMyEvent(myButton, "click", () => {
  myEl.textContent = "changed from js";
});
