import RouterHelper from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import authController from "../../controllers/auth.controller.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = authController;
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), this.controller.registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), this.controller.loginCb);
    this.create("/signout", ["USER", "ADMIN"], this.controller.signoutCb);
    this.read("/online", ["USER", "ADMIN"], this.controller.onlineCb);
    this.read("/bad-auth", ["PUBLIC"], this.controller.badAuthCb);
    this.read("/forbidden", ["PUBLIC"], this.controller.forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), this.controller.loginCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
