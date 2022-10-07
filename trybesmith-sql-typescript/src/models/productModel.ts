import { ResultSetHeader } from 'mysql2/promise';
import { Iproduct } from '../interfaces/productInterface';
import connection from './connection';

const createProduct = async (product:Iproduct):Promise<Iproduct> => {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
    [product.name, product.amount],
  );
  return { id: insertId, ...product };
};

const getAllProducts = async ():Promise<Iproduct[]> => {
  const [products] = await connection.execute('SELECT * from Trybesmith.Products');
  return products as Iproduct[];
};

export ={
  createProduct, 
  getAllProducts,
};