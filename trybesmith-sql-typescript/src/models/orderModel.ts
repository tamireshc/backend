import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IAllOrders, INewOrder } from '../interfaces/orderInterdace';
import connection from './connection';

const getAllOrders = async ():Promise<IAllOrders[]> => {
  const [result] = await connection.execute<IAllOrders[] & RowDataPacket[]>(
    `SELECT O.id,O.userId, JSON_ARRAYAGG(P.id) as productsIds
    FROM Trybesmith.Orders AS O
    INNER JOIN Trybesmith.Products AS P
    ON O.id = P.orderId
    GROUP BY orderId`,
  );
  return result as IAllOrders[];
};

const createOrder = async (userId:number, productsIds:INewOrder[]) => {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );
  console.log('insertId', insertId);
  console.log('productsIds', productsIds);

  productsIds.map(async (item: unknown) => connection.execute(
    'UPDATE  Trybesmith.Products SET orderId=? WHERE id =?', 
    [insertId, item],
  ));

  return { userId, productsIds };
};

export ={
  getAllOrders,
  createOrder,
};