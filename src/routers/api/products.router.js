import RouterHelper from "../../helpers/router.helper.js";
import { productsManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await productsManager.createOne(data);
  res.json201(one._id);
};
const readAll = async (req, res) => {
  const filter = req.query;
  const all = await productsManager.readAll(filter);
  if (all.length > 0) {
    res.json200(all);
  } else {
    res.json404();
  }
};
const readById = async (req, res) => {
  const { id } = req.params;
  const one = await productsManager.readById(id);
  if (one) {
    res.json200(one._id);
  } else {
    res.json404();
  }
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const one = await productsManager.updateById(id, data);
  if (one) {
    res.json200(one._id);
  } else {
    res.json404();
  }
};
const destroyById = async (req, res) => {
  const { id } = req.params;
  const one = await productsManager.destroyById(id);
  if (one) {
    res.json200(one._id);
  } else {
    res.json404();
  }
};

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:id", ["PUBLIC"], readById);
    this.update("/:id", ["ADMIN"], updateById);
    this.destroy("/:id", ["ADMIN"], destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;



// import { Router } from "express";
// import { productsManager } from "../../data/manager.mongo.js";
// import passport from "../../middlewares/passport.mid.js";
// import passportCb from "../../middlewares/passportCb.mid.js";


// const productsRouter = Router();

// const createOne = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const one = await productsManager.createOne(data);
//     res.status(201).json({
//       method: req.method,
//       url: req.originalUrl,
//       response: one,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const readAll = async (req, res, next) => {
//   try {
//     const filter = req.query;
//     const all = await productsManager.readAll(filter);
//     if (all.length > 0) {
//       res.status(200).json({
//         method: req.method,
//         url: req.originalUrl,
//         response: all,
//       });
//     } else {
//       const error = new Error("Not found");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// const readById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const one = await productsManager.readById(id);
//     if (one) {
//       res.status(200).json({
//         method: req.method,
//         url: req.originalUrl,
//         response: one,
//       });
//     } else {
//       const error = new Error("Not found");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// const updateById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const one = await productsManager.updateById(id, data);
//     if (one) {
//       res.status(200).json({
//         method: req.method,
//         url: req.originalUrl,
//         response: one,
//       });
//     } else {
//       const error = new Error("Not found");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// const destroyById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const one = await productsManager.destroyById(id);
//     if (one) {
//       res.status(200).json({
//         method: req.method,
//         url: req.originalUrl,
//         response: one,
//       });
//     } else {
//       const error = new Error("Not found");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// productsRouter.post("/", passportCb("admin"), createOne);
// productsRouter.get("/", readAll);
// productsRouter.get("/:id", readById);
// productsRouter.put("/:id", passportCb("admin"), updateById);
// productsRouter.delete("/:id", passportCb("admin"),destroyById);

// export default productsRouter;
