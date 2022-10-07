export {};

export interface IUser {
  id?:number
  username:string,
  classe:string,
  level:number
  password:string, 
}
// declare global {
//   namespace NodeJS {
//     declare module ProcessEnv {
//       MYSQL_USER:string
//       MYSQL_PASSWORD:string
//       MYSQL_HOST:string
//       JWT_SECRET:string
//     }
//   }
// }

export interface IUserLogin {
  username:string,
  password:string, 
}

export interface ProcessEnv {
  [key: string]: string | undefined
}

// interface UserToken {
//   id:string,
//   username:string,
  
// }

export interface IUserExists {
  id:number,
  username:string,
}

export interface IUserDontExists {
  type:string,
  message:string,
}