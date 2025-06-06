import cartsService from "../services/carts.service.js";

class CartsController {
  constructor() {
    this.service = cartsService;
  }

  createOne = async (req, res) => {
    const { _id: user_id } = req.user;
    const cart = await this.service.createOne({ user_id });
    res.json201(cart._id);
  };

  readAll = async (req, res) => {
    const carts = await this.service.readAll();
    carts.length ? res.json200(carts) : res.json404();
  };

  readById = async (req, res) => {
    const { id } = req.params;
    const { _id: user_id } = req.user;
    const cart = await this.service.readByIdPopulated(id);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    res.json200(cart);
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const { _id: user_id } = req.user;
    const data = req.body;
    const cart = await this.service.readById(id);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    const updated = await this.service.updateById(id, data);
    updated ? res.json200(updated) : res.json404();
  };

  destroyById = async (req, res) => {
    const { id } = req.params;
    const { _id: user_id } = req.user;
    const cart = await this.service.readById(id);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    const deleted = await this.service.destroyById(id);
    deleted ? res.json200(deleted) : res.json404();
  };

  addProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { _id: user_id } = req.user;
    const cart = await this.service.readById(cid);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    const updated = await this.service.addProduct(cid, pid);
    updated ? res.json200(updated) : res.json404();
  };

  removeProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { _id: user_id } = req.user;
    const cart = await this.service.readById(cid);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    const updated = await this.service.removeProduct(cid, pid);
    updated ? res.json200(updated) : res.json404();
  };

  emptyCart = async (req, res) => {
    const { cid } = req.params;
    const { _id: user_id } = req.user;
    const cart = await this.service.readById(cid);
    if (!cart || cart.user_id._id.toString() !== user_id.toString()) {
      return res.json403();
    }
    const updated = await this.service.emptyCart(cid);
    updated ? res.json200(updated) : res.json404();
  };
}

const cartsController = new CartsController();
export default cartsController;

