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
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      this.controller.registerCb
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      this.controller.loginCb
    );
    this.create("/signout", ["USER", "ADMIN"], this.controller.signoutCb);
    this.read("/online", ["USER", "ADMIN"], this.controller.onlineCb);
    this.read("/bad-auth", ["PUBLIC"], this.controller.badAuthCb);
    this.read("/forbidden", ["PUBLIC"], this.controller.forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/redirect",
      ["PUBLIC"],
      passportCb("google"),
      this.controller.loginCb
    );
    this.read(
      "/verify/:email/:verifyCode",
      ["PUBLIC"],
      this.controller.verifyCb
    );
    this.create("/reset-password", ["PUBLIC"], this.controller.sendResetEmailCb);
    this.update(
      "/reset-password/:email",
      ["PUBLIC"],
      this.controller.updatePasswordCb
    );
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
