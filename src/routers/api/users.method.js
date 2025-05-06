import Method from "./method.js";
import { usersManager } from "../../data/manager.mongo.js";

const usersRouter = new Method(usersManager);
export default usersRouter.getRouter();