import { createHash } from "../helpers/hash.util.js";
import { verifyToken } from "../helpers/token.util.js";
import usersService from "../services/users.service.js";
import sendResetEmail from "../helpers/resetPassword.helper.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }

  registerCb = async (req, res) => res.json201(null, "Registered");

  loginCb = async (req, res) => {
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
    res
      .cookie("token", req.user.token, opts)
      .json200(req.user._id, "Logged in");
  };

  signoutCb = (req, res) =>
    res.clearCookie("token").json200(req.user._id, "Signed out");

  onlineCb = async (req, res) => {
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await this.service.readById(dataToken?._id);
    if (!user) {
      //return res.json401("Invalid credentials");
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
    const { password, __v, createdAt, updatedAt, ...rest } = user;
    res.json200(rest);
  };

  badAuthCb = (req, res) => res.json401();

  forbiddenCb = (req, res) => res.json403();

  verifyCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await this.service.readBy({ email, verifyCode });
    if (!user) {
      res.json404();
    }
    await this.service.updateById(user._id, { isVerified: true });
    res.json200({ isVerified: true });
  };

  sendResetEmailCb = async (req, res) => {
    const { email } = req.body;
    const user = await this.service.readBy({ email });
    if (!user) return res.json404({ message: "User not found" });

    await sendResetEmail(user.email);
    res.json200({ message: "Reset email sent" });
  };

  updatePasswordCb = async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    const user = await this.service.readBy({ email });
    if (!user) return res.json404({ message: "User not found" });

    const hashed = createHash(password);
    const updated = await this.service.updateById(user._id, {
      password: hashed,
    });

    if (!updated) return res.json500();
    res.json200({ message: "Password updated successfully" });
  };
}

const authController = new AuthController();
export default authController;
