import RouterHelper from "../helpers/router.helper.js";
import apiRouter from "./api.router.js";
import viewsRouter from "./views.router.js";

class IndexRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/", viewsRouter);
    this.use("/api", apiRouter);
  };
}

const router = new IndexRouter().getRouter();
export default router;


// import { Router } from "express";
// import apiRouter from "./api.router.js";
// import viewsRouter from "./views.router.js";

// const router = Router();

// router.use("/", viewsRouter);
// router.use("/api", apiRouter);

// export default router;
