import RouterHelper from "../../helpers/router.helper.js";
import { productsManager } from "../../data/manager.mongo.js";
import CustomCartsManager from "../../data/custom/carts.custom.manager.js";

const cartsManager = new CustomCartsManager();

const createOne = async (req, res) => {
  const { _id: user_id } = req.user;
  const cart = await cartsManager.createOne({ user_id, products: [] });
  res.json201(cart._id);
};

const readAll = async (req, res) => {
  const carts = await cartsManager.readAllPopulated();
  carts.length ? res.json200(carts) : res.json404();
};

const readById = async (req, res) => {
  const { id } = req.params;
  const { _id: user_id } = req.user;

  const cart = await cartsManager.readByIdPopulated(id);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }
  res.json200(cart);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: user_id } = req.user;
  const data = req.body;

  const cart = await cartsManager.readById(id);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }

  const updated = await cartsManager.updateById(id, data);
  updated ? res.json200(updated) : res.json404();
};

const destroyById = async (req, res) => {
  const { id } = req.params;
  const { _id: user_id } = req.user;

  const cart = await cartsManager.readById(id);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }

  const deleted = await cartsManager.destroyById(id);
  deleted ? res.json200(deleted) : res.json404();
};

const addProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const { _id: user_id } = req.user;

  const cart = await cartsManager.readById(cid);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }

  const productExists = await productsManager.readById(pid);
  if (!productExists) return res.json404();

  const updatedCart = await cartsManager.addProductToCart(cid, pid);
  updatedCart ? res.json200(updatedCart) : res.json404();
};

const removeProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const { _id: user_id } = req.user;

  const cart = await cartsManager.readById(cid);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }

  const updatedCart = await cartsManager.removeProductFromCart(cid, pid);
  updatedCart ? res.json200(updatedCart) : res.json404();
};

const emptyCart = async (req, res) => {
  const { cid } = req.params;
  const { _id: user_id } = req.user;

  const cart = await cartsManager.readById(cid);
  if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
    return res.json403();
  }

  const updatedCart = await cartsManager.emptyCart(cid);
  updatedCart ? res.json200(updatedCart) : res.json404();
};

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["USER"], createOne);
    this.read("/", ["ADMIN"], readAll);
    this.read("/:id", ["USER"], readById);
    this.update("/:id", ["USER"], updateById);
    this.destroy("/:id", ["USER"], destroyById);

    this.update("/:cid/products/:pid", ["USER"], addProduct);
    this.destroy("/:cid/products/:pid", ["USER"], removeProduct);
    this.destroy("/:cid/products", ["USER"], emptyCart);
  };
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;
