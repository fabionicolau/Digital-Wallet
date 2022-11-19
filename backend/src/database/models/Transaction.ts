import { Model, INTEGER, DATEONLY, DECIMAL } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'id',
    },
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: DATEONLY,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: false,
  timestamps: true,
  updatedAt: false,
  modelName: 'Transaction',
  tableName: 'Transactions',
});

Transaction.hasMany(Account, { foreignKey: 'id', as: 'debitedAccount' });
Transaction.hasMany(Account, { foreignKey: 'id', as: 'creditedAccount' });

export default Transaction;
