import RouterHelper from "../helpers/router.helper.js";
import productsRepository from "../repositories/products.repository.js";
import usersRepository from "../repositories/users.repository.js";
import cartsManager from "../repositories/carts.repository.js";


const homeViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("index", { products });
};
const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepository.readById(pid);
  res.status(200).render("product", { product });
};
const registerViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("register", { products });
};
const loginViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("login", { products });
};
const profileViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  const user = await usersRepository.readById(req.user._id);
  res.status(200).render("profile", { products, user });
};

const cartViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  const cart = await cartsManager.readByIdPopulated(req.user.cart_id);
  res.status(200).render("cart", { products, cart });
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], homeViewCb);
    this.render("/product/:pid", ["PUBLIC"], productViewCb);
    this.render("/register", ["PUBLIC"], registerViewCb);
    this.render("/login", ["PUBLIC"], loginViewCb);
    this.render("/profile", ["USER", "ADMIN"], profileViewCb);
    this.render("/cart", ["USER"], cartViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;