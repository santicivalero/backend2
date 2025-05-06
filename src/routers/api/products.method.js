import Method from "./method.js";
import { productsManager } from "../../data/manager.mongo.js";

const productsRouter = new Method(productsManager);
export default productsRouter.getRouter();