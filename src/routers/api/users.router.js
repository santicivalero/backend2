import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";

const usersRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await usersManager.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await usersManager.readAll(filter);
    if (all.length > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await usersManager.readById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const one = await usersManager.updateById(id, data);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const destroyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await usersManager.destroyById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
usersRouter.post("/", createOne);
usersRouter.get("/", readAll);
usersRouter.get("/:id", readById);
usersRouter.put("/:id", updateById);
usersRouter.delete("/:id", destroyById);

export default usersRouter;
