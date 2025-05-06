import { Router } from "express";

 class Method {
  constructor(manager) {
    this.router = Router();
    this.manager = manager;

    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/", this.createOne);
    this.router.get("/", this.readAll);
    this.router.get("/:id", this.readById);
    this.router.put("/:id", this.updateById);
    this.router.delete("/:id", this.destroyById);
  }

  createOne = async (req, res, next) => {
    try {
      const data = req.body;
      const one = await this.manager.createOne(data);
      res.status(201).json({ method: req.method, url: req.originalUrl, response: one });
    } catch (error) {
      next(error);
    }
  };

  readAll = async (req, res, next) => {
    try {
      const filter = req.query;
      const all = await this.manager.readAll(filter);
      if (all.length > 0) {
        res.status(200).json({ method: req.method, url: req.originalUrl, response: all });
      } else {
        throw this.notFound();
      }
    } catch (error) {
      next(error);
    }
  };

  readById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const one = await this.manager.readById(id);
      if (one) {
        res.status(200).json({ method: req.method, url: req.originalUrl, response: one });
      } else {
        throw this.notFound();
      }
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const one = await this.manager.updateById(id, data);
      if (one) {
        res.status(200).json({ method: req.method, url: req.originalUrl, response: one });
      } else {
        throw this.notFound();
      }
    } catch (error) {
      next(error);
    }
  };

  destroyById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const one = await this.manager.destroyById(id);
      if (one) {
        res.status(200).json({ method: req.method, url: req.originalUrl, response: one });
      } else {
        throw this.notFound();
      }
    } catch (error) {
      next(error);
    }
  };

  notFound() {
    const error = new Error("Not found");
    error.statusCode = 404;
    return error;
  }

  getRouter() {
    return this.router;
  }
}

export default Method;