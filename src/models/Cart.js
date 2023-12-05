export default class Cart {
  constructor(cart) {
    this.items = cart.items || {};
  }
  add(item, id, quantity) {
    let store = this.items[id];
    if (!store) store = this.items[id] = { item, quantity: 0, price: 0 }
    // if (store.quantity <= store.item.quantity) store.quantity += parseInt(quantity);
    store.quantity += Number(quantity);
    store.price = store.item.price * store.quantity;
  }
  remove(id) {
    delete this.items[id];
  }
  generate() {
    let arr = [];
    for (let id in this.items) arr.push(this.items[id]);
    return arr;
  }
}
