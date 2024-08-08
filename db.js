const mongoose = require("mongoose")
const {Types: {ObjectId}} = mongoose;

let MONGO_URI;

const {name, username, password, host, port} = {
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}


MONGO_URI = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`

console.log(MONGO_URI)

exports.connect = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(MONGO_URI, {ignoreUndefined: true}).then(() => {
    console.log('Database connection successful')
  }).catch(err => {
    console.log(err)
    console.error('Database connection error')
  })

  //Helper to check if an ID is an object ID
  mongoose.isObjectId = function (id) {
    return (id instanceof ObjectId);
  };

//Helper to validate a string as object ID
  mongoose.isValidObjectId = function (str) {
    if (typeof str !== 'string') {
      return false;
    }
    return str.match(/^[a-f\d]{24}$/i);
  };
}

