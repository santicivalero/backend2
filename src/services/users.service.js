import { usersManager } from "../data/manager.mongo.js";

export class UsersService {
  constructor() {
    this.manager = usersManager;
  }
  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const usersService = new UsersService();
export default usersService;
