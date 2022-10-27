import { Model, INTEGER, STRING } from 'sequelize';
import db from '.'; // importando o index

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db, // que é o index
  modelName: 'teams', // nome da tabela
  timestamps: false,
});

export default Teams;
