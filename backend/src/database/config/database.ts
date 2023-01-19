import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: 'digital-wallet',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
  retry: {
    match: [/Deadlock/i],
    max: 3, 
  },
  define: {
    timestamps: true,
  },
  logging: false,
}

module.exports = config;
