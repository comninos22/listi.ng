const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'listi_ng',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Change to your database dialect (e.g., postgres, sqlite, etc.)
  },
  seedersPath: path.resolve(__dirname, 'src/seeds'), // Specify the correct seeders path
};
