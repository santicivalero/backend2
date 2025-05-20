import RouterHelper from "../helpers/router.helper.js";
import usersRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartRouter from "./api/cart.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

class ApiRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/carts", cartRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
  };
}

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;
