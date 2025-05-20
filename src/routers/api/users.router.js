import RouterHelper from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await usersManager.createOne(data);
  res.json201(one._id);
};

const readAll = async (req, res) => {
  const filter = req.query;
  const all = await usersManager.readAll(filter);
  if (all.length > 0) {
    res.json200(all);
  } else {
    res.json404();
  }
};

const readById = async (req, res) => {
  const { id } = req.params;
  const one = await usersManager.readById(id);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const one = await usersManager.updateById(id, data);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

const destroyById = async (req, res) => {
  const { id } = req.params;
  const one = await usersManager.destroyById(id);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["ADMIN"], readAll);
    this.read("/:id", ["ADMIN"], readById);
    this.update("/:id", ["USER"], updateById);
    this.destroy("/:id", ["USER"], destroyById);
  };
}

const usersRouter = new UsersRouter().getRouter();
export default usersRouter;


// import { Router } from "express";
// import { usersManager } from "../../data/manager.mongo.js";
// import passport from "../../middlewares/passport.mid.js";
// import passportCb from "../../middlewares/passportCb.mid.js";

// const usersRouter = Router();

// const createOne = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const one = await usersManager.createOne(data);
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
//     const all = await usersManager.readAll(filter);
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
//     const one = await usersManager.readById(id);
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
//     const one = await usersManager.updateById(id, data);
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
//     const one = await usersManager.destroyById(id);
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

// usersRouter.post("/", passportCb("admin"), createOne);
// usersRouter.get("/", passportCb("admin"), readAll);
// usersRouter.get("/:id", passportCb("admin"), readById);
// usersRouter.put("/:id", passportCb("user"), updateById);
// usersRouter.delete("/:id", passportCb("user"), destroyById);

// export default usersRouter;
