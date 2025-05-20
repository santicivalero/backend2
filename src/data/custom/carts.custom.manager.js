import ManagerMongo from "../manager.mongo.js";
import Cart from "../models/carts.model.js";

class CustomCartsManager extends ManagerMongo {
  constructor() {
    super(Cart);
  }

  async addProductToCart(cid, pid) {
    const cart = await this.model.findById(cid);
    if (!cart) return null;

    const index = cart.products.findIndex(
      (p) => p.product.toString() === pid.toString()
    );
    if (index !== -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async removeProductFromCart(cid, pid) {
    const cart = await this.model.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== pid.toString()
    );
    await cart.save();
    return cart;
  }

  async emptyCart(cid) {
    const cart = await this.model.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }

  async readByIdPopulated(id) {
    return await this.model
      .findById(id)
      .populate("products.product", "title price image");
  }

  async readAllPopulated(filter = {}) {
    return await this.model
      .find(filter)
      .populate("products.product", "title price stock")
      .lean();
  }
}

export default CustomCartsManager;
