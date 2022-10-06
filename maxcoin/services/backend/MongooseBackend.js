const mongoose = require('mongoose');
const CoinAPI = require("../CoinAPI");

class MongooseBackend{

    constructor() {
        // this.coinAPI = new CoinAPI();
        this.mongoUrl = 'mongodb://localhost:27017/coin';
        this.client = null;
        this.collection = null;
    }

    async connect() {

        mongoose.connect( this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then((client) => {
                this.client = client;
                return this.client;
            });
    }

    async insert() {

    }

    async max() {

        console.log("Connect to mongoose");
        console.log('mongoose-connect');

        await this.connect()
            .then(() => {
                console.log('Successfully connected to mongoose');
            }).catch((err) => {
                console.log( err + ' while connecting to mongoose');
            });

        // await this.insert()
        //     .then(() => {
        //         console.log('The data is inserted in the mongoose database');
        //     })
        //     .catch((error) => {
        //         console.log(error + ' while saving data in database');
        //     });
    }
}

module.exports = MongooseBackend;