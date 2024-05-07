const basket = [];
const doSomethingPrivate = () => {
  //...
};

const doSomethingElsePrivate = () => {
  //...
};

console.log("i work from basketModule");

const basketModule = {
  // Add items to our basket
  addItem(values) {
    basket.push(values);
  },
  // Get the count of items in the basket
  getItemCount() {
    return basket.length;
  },
  // Public alias to a private function
  doSomething() {
    doSomethingPrivate();
  },

  getTotal() {
    return basket.reduce((currentSum, item) => item.price + currentSum, 0);
  },
};

export default basketModule;
