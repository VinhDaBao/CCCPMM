import { Sequelize } from 'sequelize';
//const { Sequelize } = require('sequelize');//ES5 module
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env]
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);

    }
}
    export default connectDB;