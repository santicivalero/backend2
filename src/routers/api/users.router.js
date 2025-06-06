import RouterHelper from "../../helpers/router.helper.js";
import usersController from "../../controllers/users.controller.js";

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = usersController;
    this.init();
  }

  init = () => {
    this.create("/", ["ADMIN"], this.controller.createOne);
    this.read("/", ["ADMIN"], this.controller.readAll);
    this.read("/:id", ["ADMIN"], this.controller.readById);
    this.update("/:id", ["USER"], this.controller.updateById);
    this.destroy("/:id", ["USER"], this.controller.destroyById);
  };
}

const usersRouter = new UsersRouter().getRouter();
export default usersRouter;
