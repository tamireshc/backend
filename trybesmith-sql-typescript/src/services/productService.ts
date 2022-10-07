import { Iproduct } from '../interfaces/productInterface';
import productModel from '../models/productModel';

const createProduct = async (product:Iproduct):Promise<Iproduct> => {
  const newProduct = await productModel.createProduct(product);
  return newProduct;
};

const getAllProducts = async ():Promise<Iproduct[]> => {
  const products = await productModel.getAllProducts();
  return products;
};

export ={
  createProduct,
  getAllProducts,
};