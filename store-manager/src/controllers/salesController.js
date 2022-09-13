const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const { type, message } = await salesService.createSales(req.body);
  if (type) {
    return res.status(404).json({ message });
  }
  res.status(201).json(message);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(Number(id));
  if (type) {
    return res.status(404).json({ message });
  }
  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(Number(id));
  if (type) {
    return res.status(404).json({ message });
  }
  res.sendStatus(204);
};

const listAllSales = async (req, res) => {
  const { message } = await salesService.listAllSales();
  return res.status(200).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateSale(req.body, id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  createSales,
  deleteSale,
  findSaleById,
  listAllSales,
  updateSale,
};