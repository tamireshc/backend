export interface IAllOrders {
  id:number,
  userId:number,
  productsIds:[]
}

export interface INewOrder{
  productsIds:number,
}

export interface User {
  user:string,
}