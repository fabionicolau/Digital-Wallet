import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Account from './Account';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "Accounts",
      key: 'id',
    },
  },
}, {
  sequelize: db,
  underscored: false,
  timestamps: false,
  modelName: 'User',
  tableName: 'Users',
});

User.hasOne(Account, { foreignKey: 'id', as: 'account' });

export default User;
