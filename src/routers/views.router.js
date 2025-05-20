import RouterHelper from "../helpers/router.helper.js";
import { productsManager } from "../data/manager.mongo.js";

const homeViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("index", { products });
};
const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.readById(pid);
  res.status(200).render("product", { product });
};
const registerViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("register", { products });
};
const loginViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("login", { products });
};
const profileViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("profile", { products });
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
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;

// import { Router } from "express";
// import { productsManager } from "../data/manager.mongo.js";

// const viewsRouter = Router();

// const homeViewCb = async (req, res) => {
//     try {
//         const products = await productsManager.readAll()
//         res.status(200).render("index", { products })
//     } catch (error) {
//         res.status(error.statusCode || 500).render("error", { error })
//     }
// }

// const productViewCb = async (req, res) => {
//     try {
//         const { pid } = req.params
//         const product = await productsManager.readById(pid)
//         res.status(200).render("product", { product })
//     } catch (error) {
//         res.status(error.statusCode || 500).render("error", { error })
//     }
// }

// const registerViewCb = async (req, res) => {
//     try {
//         const products = await productsManager.readAll()
//         res.status(200).render("register", { products })
//     } catch (error) {
//         res.status(error.statusCode || 500).render("error", { error })
//     }
// }
// const loginViewCb = async (req, res) => {
//     try {
//         const products = await productsManager.readAll()
//         res.status(200).render("login", { products })
//     } catch (error) {
//         res.status(error.statusCode || 500).render("error", { error })
//     }
// }
// const profileViewCb = async (req, res) => {
//     try {
//         const products = await productsManager.readAll()
//         res.status(200).render("profile", { products })
//     } catch (error) {
//         res.status(error.statusCode || 500).render("error", { error })
//     }
// }

// viewsRouter.get("/", homeViewCb)
// viewsRouter.get("/product/:pid", productViewCb)
// viewsRouter.get("/register", registerViewCb)
// viewsRouter.get("/login", loginViewCb)
// viewsRouter.get("/profile", profileViewCb)



// export default viewsRouter;
