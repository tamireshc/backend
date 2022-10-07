import { Request, Response } from 'express';
import { Iproduct } from '../interfaces/productInterface';
import productService from '../services/productService';

const createProduct = async (req: Request, res: Response) => {
  const product:Iproduct = req.body;
  try {
    const newProduct = await productService.createProduct(product);
    return res.status(201).json(newProduct);
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};
// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
export ={
  createProduct,
  getAllProducts,
};