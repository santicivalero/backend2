import RouterHelper from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await usersManager.createOne(data);
  res.json201(one._id);
};

const readAll = async (req, res) => {
  const filter = req.query;
  const all = await usersManager.readAll(filter);
  if (all.length > 0) {
    res.json200(all);
  } else {
    res.json404();
  }
};

const readById = async (req, res) => {
  const { id } = req.params;
  const one = await usersManager.readById(id);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const one = await usersManager.updateById(id, data);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

const destroyById = async (req, res) => {
  const { id } = req.params;
  const one = await usersManager.destroyById(id);
  if (one) {
    res.json200(one);
  } else {
    res.json404();
  }
};

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["ADMIN"], readAll);
    this.read("/:id", ["ADMIN"], readById);
    this.update("/:id", ["USER"], updateById);
    this.destroy("/:id", ["USER"], destroyById);
  };
}

const usersRouter = new UsersRouter().getRouter();
export default usersRouter;
