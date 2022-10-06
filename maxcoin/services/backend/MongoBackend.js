const { MongoClient } = require('mongodb');
const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = 'mongodb://localhost:27017/maxcoin';
    this.client = null;
    this.collection = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    this.client = await mongoClient.connect();
    this.collection = this.client.db('maxcoin').collection('values');
    return this.client;
  }


  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];
    Object.entries(data.bpi).forEach((element) => {
    console.log('Here is the data: ' + element);
      documents.push({
        date: element[0],
        value: element[1],
      });
    });
    return this.collection.insertMany(documents);
  }

  async max() {
    console.log("Connect to mongodb");
    console.log('mongodb-connect');

    await this.connect()
        .then(() => {
          console.log('Successfully connected to mongodb');
        }).catch((err) => {
          console.log( err + ' while connecting to mongodb');
        });

    await this.insert()
        .then(() => {
          console.log('The data is inserted in the mongodb database');
        })
        .catch((error) => {
          console.log(error + ' while saving data in database');
        });

  }
}
module.exports = MongoBackend;
