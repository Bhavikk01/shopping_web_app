const MongoDatabase= require("./services/backend/MongoBackend");
// const MongooseBackend= require("./services/backend/MongooseBackend");
const MySqlBackend = require('./services/backend/MySQLBackend');

async function runMongodb() {
  const mongoDatabase = new MongoDatabase();
  return mongoDatabase.max();
}
async function runMySql() {
    const mySqlBackend = new MySqlBackend();
    return mySqlBackend.max();
}

runMongodb()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

runMySql()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => console.error(err));
