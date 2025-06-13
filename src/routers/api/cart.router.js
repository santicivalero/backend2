import RouterHelper from "../../helpers/router.helper.js";
import cartsController from "../../controllers/carts.controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = cartsController;
    this.init();
  }

  init = () => {
    this.create("/", ["USER"], this.controller.createOne);
    this.read("/", ["ADMIN"], this.controller.readAll);
    this.read("/:id", ["USER"], this.controller.readById);
    this.update("/:id", ["USER"], this.controller.updateById);
    this.destroy("/:id", ["USER"], this.controller.destroyById);

    this.update("/:cid/products/:pid", ["USER"], this.controller.addProductToCart);
    this.destroy("/:cid/products/:pid", ["USER"], this.controller.removeProductFromCart);
    this.destroy("/:cid/products", ["USER"], this.controller.emptyCart);
  };
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;
