import { Router } from "express";

const cookiesRouter = Router();

const createCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Cookie created";
    const data = { method, url, message };
    res
      .status(201)
      .cookie("user_id", "1234abcdef", { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie("role", "admin", { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true},)
      .json(data);
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Cookie read";
    const cookies = {common: req.cookies, signed: req.signedCookies};
    const data = { method, url, message, cookies };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Cookie cleared";
    const data = { method, url, message };
    res.clearCookie("user_id").status(200).clearCookie("role").json(data);
  } catch (error) {
    next(error);
  }
};



cookiesRouter.get("/create", createCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/clear", clearCb);

export default cookiesRouter;
