import cartsRepository from "../repositories/carts.repository.js";
import productsRepository from "../repositories/products.repository.js";

class CartsService {
  constructor() {
    this.repository = cartsRepository;
    this.productsRepository = productsRepository;
  }

  createOne = async ({ user_id }) => {
    return await this.repository.createOne({ user_id, products: [] });
  };

  readAllPopulated = async () => {
    return await this.repository.readAllPopulated();
  };

  readById = async (id) => await this.repository.readById(id);
  
  readByIdPopulated = async (id) => await this.repository.readByIdPopulated(id);

  updateById = async (id, data) => {
    return await this.repository.updateById(id, data);
  };

  destroyById = async (id) => {
    return await this.repository.destroyById(id);
  };

  addProductToCart = async (cid, pid) => {
    const product = await productsRepository.readById(pid);
    if (!product) return null;
    return await this.repository.addProductToCart(cid, pid);
  };

  removeProductFromCart = async (cid, pid) => {
    return await this.repository.removeProductFromCart(cid, pid);
  };

  emptyCart = async (cid) => {
    return await this.repository.emptyCart(cid);
  };
}

const cartsService = new CartsService();
export default cartsService;
