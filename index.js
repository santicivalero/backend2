import "./src/helpers/env.helper.js";
import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import cookieParser from "cookie-parser";
import argsHelper from "./src/helpers/args.helper.js";
//import session from "express-session";
//import MongoStore from "connect-mongo";


/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port " + port);
  console.log("mode: "+ argsHelper.mode);
};
server.listen(port, ready);

/* engine settings */
server.engine("handlebars", engine({
  helpers: {
    multiply: (a, b) => (a * b).toFixed(2),
  }
}));
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares settings */
//server.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true, store: new MongoStore({mongoUrl: process.env.URL_MONGO, ttl: 7 * 24 * 60 * 60,}),}));
server.use(cookieParser(process.env.SECRET));
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(express.static("public"));
server.use(morgan("dev"));

/* router settings */
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
