import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Registered";
    const data = { method, url, message };
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Logged in";
    /* configurar la cookie con los datos del usuario */
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
    /* enviar respuseta al cliente */
    const data = { method, url, message };
    const { user } = req;
    res
      .status(200)
      .cookie("token", user.token, opts)
      // .cookie("user_id", user._id, opts)
      // .cookie("role", user.role, opts)
      // .cookie("email", user.email, opts)
      .json(data);
  } catch (error) {
    next(error);
  }
};
const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Signed out";
    /* eliminar la cookie y enviar respuesta al cliente */
    const data = { method, url, message };
    res
      .status(200)
      .clearCookie("token")
      // .clearCookie("user_id")
      // .clearCookie("role")
      // .clearCookie("email")
      .json(data);
  } catch (error) {
    next(error);
  }
};
const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await usersManager.readById(dataToken?._id);
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const { password, createdAt, updatedAt, ...rest } = user;
    const data = {
      method,
      url,
      user: rest,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const badAuthCb = (req, res, next) => {
  try {
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};
const optBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" };

authRouter.post(
  "/register",
  passport.authenticate("register", optBadAuth),
  registerCb
);
authRouter.post("/login", passport.authenticate("login", optBadAuth), loginCb);
authRouter.post("/signout", signoutCb);
authRouter.post("/online", onlineCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/redirect",
  passport.authenticate("google", optBadAuth),
  loginCb
);

export default authRouter;
