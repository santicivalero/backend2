import RouterHelper from "../helpers/router.helper.js";
import usersRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
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
    this.use("/carts", cartsRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
  };
}

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;


// import { Router } from "express";
// import usersRouter from "./api/users.router.js";
// import productsRouter from "./api/products.router.js";
// import cartsRouter from "./api/carts.router.js";
// import cookiesRouter from "./api/cookies.router.js";
// import sessionsRouter from "./api/sessions.router.js";
// import authRouter from "./api/auth.router.js";

// const apiRouter = Router();
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/products", productsRouter);
// apiRouter.use("/carts", cartsRouter);
// apiRouter.use("/cookies", cookiesRouter);
// apiRouter.use("/sessions", sessionsRouter);
// apiRouter.use("/auth", authRouter);


// export default apiRouter;
