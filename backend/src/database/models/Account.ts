import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import User from './User';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  balance: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: false,
  timestamps: false,
  modelName: 'Account',
  tableName: 'Accounts',
});


export default Account;
