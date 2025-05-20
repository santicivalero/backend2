import RouterHelper from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";
//import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const registerCb = async (req, res) => res.json201(null, "Registered");
const loginCb = async (req, res) => {
  const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
  res.cookie("token", req.user.token, opts).json200(req.user._id, "Logged in");
};
const signoutCb = (req, res) =>
  res.clearCookie("token").json200(req.user._id, "Signed out");
const onlineCb = async (req, res) => {
  const { token } = req.signedCookies;
  const dataToken = verifyToken(token);
  let user = await usersManager.readById(dataToken?._id);
  if (!user) {
    return res.json401("Invalid credentials");
  }
  const { password, __v, createdAt, updatedAt, ...rest } = user;
  res.json200(rest);
};
const badAuthCb = (req, res) => res.json401();
const forbiddenCb = (req, res) => res.json403();

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.create("/signout", ["USER", "ADMIN"], signoutCb);
    this.read("/online", ["USER", "ADMIN"], onlineCb);
    this.read("/bad-auth", ["PUBLIC"], badAuthCb);
    this.read("/forbidden", ["PUBLIC"], forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;




// import { Router } from "express";
// import { usersManager } from "../../data/manager.mongo.js";
// // import passport from "../../middlewares/passport.mid.js";
// import passportCb from "../../middlewares/passportCb.mid.js";
// import { verifyToken } from "../../helpers/token.util.js";

// const authRouter = Router();

// const registerCb = async (req, res, next) => {
//   try {
//     const { method, originalUrl: url } = req;
//     const message = "Registered";
//     const data = { method, url, message };
//     res.status(201).json(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const loginCb = async (req, res, next) => {
//   try {
//     const { method, originalUrl: url } = req;
//     const message = "Logged in";
//     /* configurar la cookie con los datos del usuario */
//     const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
//     /* enviar respuseta al cliente */
//     const data = { method, url, message };
//     const { user } = req;
//     res
//       .status(200)
//       .cookie("token", user.token, opts)
//       // .cookie("user_id", user._id, opts)
//       // .cookie("role", user.role, opts)
//       // .cookie("email", user.email, opts)
//       .json(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const signoutCb = (req, res, next) => {
//   try {
//     const { method, originalUrl: url } = req;
//     const message = "Signed out";
//     /* eliminar la cookie y enviar respuesta al cliente */
//     const data = { method, url, message };
//     res
//       .status(200)
//       .clearCookie("token")
//       // .clearCookie("user_id")
//       // .clearCookie("role")
//       // .clearCookie("email")
//       .json(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const onlineCb = async (req, res, next) => {
//   try {
//     const { method, originalUrl: url } = req;
//     const { token } = req.signedCookies;
//     const dataToken = verifyToken(token);
//     let user = await usersManager.readById(dataToken?._id);
//     if (!user) {
//       const error = new Error("Invalid credentials");
//       error.statusCode = 401;
//       throw error;
//     }
//     const { password, createdAt, updatedAt, ...rest } = user;
//     const data = {
//       method,
//       url,
//       user: rest,
//     };
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const badAuthCb = (req, res, next) => {
//   try {
//     const error = new Error("Bad auth");
//     error.statusCode = 401;
//     throw error;
//   } catch (error) {
//     next(error);
//   }
// };
// const forbiddenCb = (req, res, next) => {
//   try {
//     const error = new Error("Forbidden");
//     error.statusCode = 403;
//     throw error;
//   } catch (error) {
//     next(error);
//   }
// };

// authRouter.post(
//   "/register",
//   passportCb("register"),
//   registerCb
// );
// authRouter.post("/login", passportCb("login"), loginCb);
// authRouter.post("/signout", passportCb("user"), signoutCb);
// authRouter.post("/online", passportCb("user"), onlineCb);
// authRouter.get("/bad-auth", badAuthCb);
// authRouter.get("/forbidden", forbiddenCb);
// authRouter.get("/google", passportCb("google", { scope: ["email", "profile"] }));
// authRouter.get("/google/redirect", passportCb("google"), loginCb);

// export default authRouter;
