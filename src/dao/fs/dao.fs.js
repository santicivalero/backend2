class DaoFs {
  constructor() {}
  createOne = async (data) => {
    /* lógica para crear uno en fs */
  };
  readAll = async (filter) => {
    /* lógica para leer todos o filtrar en fs */
  };
  readBy = async (data) => {
    /* lógica para leer uno de fs */
  };
  readById = async (id) => {
    /* lógica para leer por id de fs */
  };
  updateById = async (id, data) => {
    /* lógica para actualizar uno en fs */
  };
  destroyById = async (id) => {
    /* lógica para eliminar uno en fs */
  };
}

const usersManager = new DaoFs();
const productsManager = new DaoFs();
const cartsManager = new DaoFs();

export { usersManager, productsManager, cartsManager };