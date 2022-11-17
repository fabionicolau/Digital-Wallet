import { Model, INTEGER, STRING } from 'sequelize';
import Account from './Account';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: string;
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
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: STRING,
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

User.hasOne(Account, { foreignKey: 'accountId', as: 'userAccount' });

export default User;
