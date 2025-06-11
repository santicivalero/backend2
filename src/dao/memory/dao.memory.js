class DaoMemory {
  constructor() {}
  createOne = async (data) => {
    /* lógica para crear uno en la memoria */
  };
  readAll = async (filter) => {
    /* lógica para leer todos o filtrar en la memoria */
  };
  readBy = async (data) => {
    /* lógica para leer uno de la memoria */
  };
  readById = async (id) => {
    /* lógica para leer por id de la memoria */
  };
  updateById = async (id, data) => {
    /* lógica para actualizar uno en la memoria */
  };
  destroyById = async (id) => {
    /* lógica para eliminar uno en la memoria */
  };
}

const usersManager = new DaoMemory();
const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();

export { usersManager, productsManager, cartsManager };