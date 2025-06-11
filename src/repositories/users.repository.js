import { usersManager } from "../dao/factory.js";
import UsersDTO from "../dto/users.dto.js";

export class UsersRepository {
  constructor() {
    this.manager = usersManager;
  }
  createOne = async (data) => await this.manager.createOne(new UsersDTO(data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  readBy = async (filter) => await this.manager.readBy(filter);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const usersRepository = new UsersRepository();
export default usersRepository;
