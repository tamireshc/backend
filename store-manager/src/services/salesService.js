const productModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const createSales = async (array) => {
  const product = await productModel.listAllProducts();
  const allProductsId = product.map((item) => item.id);

  const allProductsIdFromArrayInsert = array.map((item) => item.productId);

  const isInArray = allProductsIdFromArrayInsert.some((el) => !allProductsId.includes(el));
  if (isInArray) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const result = await salesModel.createSales(array);
  return { type: null, message: { id: result, itemsSold: array } };
};

const findSaleById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (!sale[0]) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const hasSaleId = await salesModel.findSaleById(id);
  if (!hasSaleId[0]) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.deleteSale(id);
  return { type: null };
};

const listAllSales = async () => {
  const sales = await salesModel.listAllSales();
  return { type: null, message: sales };
};

const updateSale = async (array, id) => {
  const hasSaleId = await salesModel.findSaleById(id);
  if (!hasSaleId[0]) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  const product = await productModel.listAllProducts();
  const allProductsId = product.map((item) => item.id);

  const allProductsIdFromArrayInsert = array.map((item) => item.productId);

  const isInArray = allProductsIdFromArrayInsert.some((el) => !allProductsId.includes(el));
  if (isInArray) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  await salesModel.updateSale(array, id);
  return { type: null, message: { saleId: id, itemsUpdated: array } };
};

module.exports = {
  createSales,
  deleteSale,
  findSaleById,
  listAllSales,
  updateSale,

};