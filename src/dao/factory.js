import dbConnect from "../helpers/dbConnect.helper.js";
const { PERSISTENCE, URL_MONGO } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    {
      console.log("connected to memory");
      const { usersManager, productsManager, cartsManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
  case "fs":
    {
      console.log("connected to fs");
      const { usersManager, productsManager, cartsManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
  default: /* por default dejamos mongo */
    {
      await dbConnect(URL_MONGO);
      const { usersManager, productsManager } = await import(
        "./mongo/dao.mongo.js"
      );
      const { default: CustomCartsManager } = await import(
        "./mongo/custom/carts.custom.manager.js"
      );
      const cartsManager = new CustomCartsManager();

      dao = { usersManager, productsManager, cartsManager };
    }
    break;
}

const { usersManager, productsManager, cartsManager } = dao;
export { usersManager, productsManager, cartsManager };
export default dao;
