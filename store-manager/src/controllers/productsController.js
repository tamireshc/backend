const productService = require('../services/serviceProcucts');

const listAllProducts = async (req, res) => {
  const products = await productService.listAllProducts();
  res.status(200).json(products);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findProductById(Number(id));
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productService.createProduct(name);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(name, Number(id));
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(Number(id));
  if (type) {
    return res.status(404).json({ message });
  }
  return res.sendStatus(204);
};

const findProductByTerm = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.findProductByTerm(q);
  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductByTerm,
};