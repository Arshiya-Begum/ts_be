const dotenv = require("dotenv") 
// This is for importing environment variables from .env file and configuring them
dotenv.config()

// connecting to mongoDB 
const db = require("./db.js")
db.connect()

// importing our telegram bot file
const telegrambot = require("./src/telegram/bot.js");

// importing express library
const express = require("express");
const app = express();
app.use(express.json());

// importing routes
const userRoute =  require('./src/routes/users.js');
const coinsRoute = require('./src/routes/coins.js')

// Launching out telegram bot
const bot = telegrambot.launchBot(process.env.BOT_TOKEN);

app.use("/api/user", userRoute);
app.use("/api/coins", coinsRoute);

// declaring root output
app.get("/", (req, res) => {
    return res.send('Hello there!! The server is running.')
})
  
// Listing to out backend server port
app.listen(process.env.PORT, process.env.HOST)