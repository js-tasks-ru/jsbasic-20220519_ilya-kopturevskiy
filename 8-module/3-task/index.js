export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    this.cartItem = this.cartItems;
    if (!!product) {
      if (this.cartItem.length === 0) {
        this.cartItem.push({product, count: 1});
      } else {
        let resultBoolean = !!(this.cartItem.find(item => item.product.id === product.id));
        if (resultBoolean === false) {
          this.cartItem.push({product, count: 1});
        } else {
          let resultObject = this.cartItem.find(item => item.product.id === product.id);
          resultObject.count++;
        }
      }
      this.onProductUpdate(this.cartItem);
    }
  }

  updateProductCount(productId, amount) {
    if (this.cartItems.length !== 0) {
      this.amount = amount;
      let resultObjectForUPD = this.cartItem.find(item => item.product.id === productId);
      let resultIndexForUPD = this.cartItem.findIndex(item => item.product.id === productId);
      resultObjectForUPD.count += this.amount;
      if (resultObjectForUPD.count === 0) {
        this.cartItem.splice(resultIndexForUPD, 1);
      }
      this.onProductUpdate(this.cartItem);
    }
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let howManyProduct = 0;
    for (let item of this.cartItem) {
      howManyProduct += item.count;
    }
    return howManyProduct;
  }

  getTotalPrice() {
    let whatPrices = 0;
    for (let item of this.cartItem) {
      whatPrices += item.product.price * item.count;
    }
    return whatPrices;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

