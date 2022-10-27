import { Model, INTEGER, STRING } from 'sequelize';
import db from '.'; // importando o index

class Users extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  role: {
    type: STRING(30),
    allowNull: false,
  },
  email: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(30),
  },
}, {
  underscored: true,
  sequelize: db, // que é o index
  modelName: 'users', // nome da tabela
  timestamps: false,
});

export default Users;
