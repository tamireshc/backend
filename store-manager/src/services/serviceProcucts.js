const productModel = require('../models/productsModel');

const listAllProducts = async () => {
  const product = await productModel.listAllProducts();
  return product;
};

const findProductById = async (id) => {
  const product = await productModel.findProductById(id);
  if (!product) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const insertId = await productModel.createProduct(name);
  return { type: null, message: { id: insertId, name } };
};

const updateProduct = async (name, id) => {
  const affectedRows = await productModel.updateProduct(name, id);
  if (!affectedRows) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const affectedRows = await productModel.deleteProduct(id);
  if (!affectedRows) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null };
};

const findProductByTerm = async (term) => {
  const products = await productModel.findProductByTerm(term);
  return { type: null, message: products };
};

module.exports = {
  listAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductByTerm,
};