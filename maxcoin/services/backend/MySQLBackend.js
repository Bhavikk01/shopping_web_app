/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');
const mySql = require('mysql2/promise');

class MySQLBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.connection = null;

  }

  async connect() {
    this.connection = await mySql.createConnection({
      host: 'localhost',
      port: 3403,
      user: 'root',
      password: 'hellomam',
      database: 'maxcoin'
    });
    return this.connection;
  }

  async disconnect() {
    return this.connection.end();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const sql = "INSERT INTO coinValues(valueData, coinValue) VALUES ?";
    const values = [];
    Object.entries(data.bpi).forEach( (element) => {
      values.push([element[0], element[1]]);
    });
    return this.connection.query(sql, [values]);
  }

  async getMax() {

  }

  async max() {
    console.log("Connect to mysql");
    console.log('mysql-connect');

    await this.connect()
        .then(() => {
          console.log('Successfully connected to mysql');
        }).catch((err) => {
          console.log( err + ' while connecting to mysql');
        });

    await this.insert()
        .then(() => {
          console.log('The data is inserted in the mysql database');
        })
        .catch((error) => {
          console.log(error + ' while saving data in database');
        });
  }
}

module.exports = MySQLBackend;