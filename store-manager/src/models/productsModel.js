const connection = require('./connection');

const listAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id =?', [id],
  );
  return product[0];
};

const createProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?)', [name],
  );
  return result.insertId;
};

const updateProduct = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id = ?',
    [name, id],
  );
  return result.affectedRows;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id =?', [id],
  );
  return result.affectedRows;
};

const findProductByTerm = async (term) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?', [`%${term}%`],
  );
  return products;
};

module.exports = {
  listAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductByTerm,
};