import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('listi_ng', 'admin', 'admin', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

export default sequelize;
