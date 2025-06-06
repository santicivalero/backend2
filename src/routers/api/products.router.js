import RouterHelper from "../../helpers/router.helper.js";
import productsController from "../../controllers/products.controller.js";

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = productsController;
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], this.controller.createOne);
    this.read("/", ["PUBLIC"], this.controller.readAll);
    this.read("/:id", ["PUBLIC"], this.controller.readById);
    this.update("/:id", ["ADMIN"], this.controller.updateById);
    this.destroy("/:id", ["ADMIN"], this.controller.destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;