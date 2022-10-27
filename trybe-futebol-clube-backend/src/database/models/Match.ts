import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.'; // importando o index
import Teams from './Team';

class Matches extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db, // que é o index
  modelName: 'matches', // nome da tabela
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamHome' });

Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamAway' });

export default Matches;
