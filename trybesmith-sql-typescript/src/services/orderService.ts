import { IAllOrders, INewOrder } from '../interfaces/orderInterdace';

import orderModel from '../models/orderModel';

const getAllOrders = async ():Promise<IAllOrders[]> => {
  const result = await orderModel.getAllOrders();
  return result;
};

const createOrder = async (userId:number, productsIds:INewOrder[]) => {
  console.log(userId, productsIds);
  const result = await orderModel.createOrder(userId, productsIds);
  return result;
};

export ={
  getAllOrders,
  createOrder,
};