import usersService from "../services/users.service.js";

class UsersController {
  createOne = async (req, res) => {
    const data = req.body;
    const one = await usersService.createOne(data);
    res.json201(one._id);
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await usersService.readAll(filter);
    if (all.length > 0) {
      res.json200(all);
    } else {
      res.json404();
    }
  };

  readById = async (req, res) => {
    const { id } = req.params;
    const one = await usersService.readById(id);
    if (one) {
      res.json200(one);
    } else {
      res.json404();
    }
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await usersService.updateById(id, data);
    if (one) {
      res.json200(one);
    } else {
      res.json404();
    }
  };

  destroyById = async (req, res) => {
    const { id } = req.params;
    const one = await usersService.destroyById(id);
    if (one) {
      res.json200(one);
    } else {
      res.json404();
    }
  };
}

const usersController = new UsersController();
export default usersController;
