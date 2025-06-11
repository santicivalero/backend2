import { cartsManager } from "../dao/factory.js";
import productsRepository from "./products.repository.js";
import CartsDTO from "../dto/carts.dto.js";

class CartsRepository {
  constructor() {
    this.manager = cartsManager;
  }

  createOne = async ({ user_id }) => {
    const cartDTO = new CartsDTO({ user_id, products: [] });
    return await this.manager.createOne(cartDTO);
    // return await this.manager.createOne({ user_id, products: [] });
  };

  readAllPopulated = async () => {
    return await this.manager.readAllPopulated();
  };

  readById = async (id) => await this.manager.readById(id);

  readByIdPopulated = async (id) => await this.manager.readByIdPopulated(id);

  updateById = async (id, data) => {
    const cartDTO = new CartsDTO(data);
    return await this.manager.updateById(id, cartDTO);
    //return await this.manager.updateById(id, data);
  };

  destroyById = async (id) => {
    return await this.manager.destroyById(id);
  };

  addProductToCart = async (cid, pid) => {
    const product = await productsRepository.readById(pid);
    if (!product) return null;
    return await this.manager.addProductToCart(cid, pid);
  };

  removeProductFromCart = async (cid, pid) => {
    return await this.manager.removeProductFromCart(cid, pid);
  };

  emptyCart = async (cid) => {
    return await this.manager.emptyCart(cid);
  };
}

const cartsRepository = new CartsRepository();
export default cartsRepository;
