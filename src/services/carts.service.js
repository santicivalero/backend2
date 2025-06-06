import CustomCartsManager from "../data/custom/carts.custom.manager.js";
import { productsManager } from "../data/manager.mongo.js";

class CartsService {
  constructor() {
    this.manager = new CustomCartsManager();
  }

  createOne = async ({ user_id }) => {
    return await this.manager.createOne({ user_id, products: [] });
  };

  readAll = async () => {
    return await this.manager.readAllPopulated();
  };

  readById = async (id) => await this.manager.readById(id);
  
  readByIdPopulated = async (id) => await this.manager.readByIdPopulated(id);

  updateById = async (id, data) => {
    return await this.manager.updateById(id, data);
  };

  destroyById = async (id) => {
    return await this.manager.destroyById(id);
  };

  addProduct = async (cid, pid) => {
    const product = await productsManager.readById(pid);
    if (!product) return null;
    return await this.manager.addProductToCart(cid, pid);
  };

  removeProduct = async (cid, pid) => {
    return await this.manager.removeProductFromCart(cid, pid);
  };

  emptyCart = async (cid) => {
    return await this.manager.emptyCart(cid);
  };
}

const cartsService = new CartsService();
export default cartsService;
