const connection = require('./connection');

const listAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
     FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS sp
     ON s.id = sp.sale_id`,
  );
  return sales;
};

const findSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?`, [id],
  );
  return sale;
};
// https://stackoverflow.com/questions/71862286/how-can-i-insert-a-array-of-objects-into-a-mysql-database
const createSales = async (array) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [new Date()],
  );
  connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id,quantity) VALUES ?',
    [array.map((item) => [result.insertId, item.productId, item.quantity])],
  );
  return result.insertId;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id =?', [id],
  );
};

const updateSale = async (array, id) => {
  const result = array.map((item) => (
    connection.execute(
      `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`, [item.quantity, id, item.productId],
    )));
  await Promise.all(result);
};

module.exports = {
  createSales,
  deleteSale,
  findSaleById,
  listAllSales,
  updateSale,

};
