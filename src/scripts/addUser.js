const dotenv = require("dotenv")
dotenv.config()

const db = require("./../../db.js")
const conn = db.connect()

const mongoose = require('mongoose');
const UserModel = require('./../models/users.js')


const addUser = async () => {
 const newUser = await new UserModel({
    telegramID: "5353855098",
    firstName: "Arshiya",
 })
  newUser.save()

  console.log("User added")
}

module.exports = {
  addUser,
}