import { Request, Response } from 'express';
import orderService from '../services/orderService';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();
    return res.status(200).json(result);
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};
// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript

const createOrder = async (req: Request, res: Response) => {
  const { productsIds, decoded } = req.body;
  try {
    const result = await orderService.createOrder(decoded.data.id, productsIds);
    return res.status(201).json(result);
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export ={
  getAllOrders,
  createOrder,
};