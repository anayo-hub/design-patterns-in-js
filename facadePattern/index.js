import module from "./facadePattern/module.js";
// Outputs: "current value: 10" and "running"
module.ayoFaced({
  run: true,
  val: 12,
  jump: true,
  callback: (updatedValue) => {
    setTimeout(() => {
      console.log(`The new value after jumping is: ${updatedValue}`);
    }, 3000);

    // Additional logic using the updatedValue, e.g., display on the UI
    if (updatedValue > 10) {
      console.log("Value is greater than 10!");
    }
  },
});
