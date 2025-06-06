import { config } from "dotenv";
import argsHelper from "./args.helper";

const path = ".env." + argsHelper.mode;
config({ path });