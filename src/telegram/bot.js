const { Telegraf, Markup } = require('telegraf');
const utils = require('../utils.js')

// const WEB_APP_URL = "https://feathers.studio/telegraf/webapp/example";
const WEB_APP_URL = process.env.APP_URL

function launchBot(token){
    // Create a bot using the token received from @BotFather
    if (token === undefined) {
        throw new Error('BOT_TOKEN must be provided!')
    }
    const bot = new Telegraf(token)

    // Assign bot listeners
    listenToCommands(bot)

    // Launch the bot
    bot.launch()

    // Handle stop events
    enableGracefulStop(bot)

    return bot
}

function listenToCommands(bot) {
    // Register a listener for the /start command, and reply with a message whenever it's used
    bot.start(async (ctx) => {
        // Welcome Message and menu 
        console.log(ctx.chat);
        ctx.reply("Hello there!!👋 Welcome to new tap and earn bot. In this app you can earn coins 🟡🤑 by tapping on to the tap 👆 button. Win 🏆 as many coins 🟡💰 as much as you can tap. Don't stop tapping to keep winning!!! 🏁🥇", {
            ...Markup.inlineKeyboard([
                [
                    Markup.button.webApp('Play Now  🎮👆', WEB_APP_URL) 
                ],
                [
                    Markup.button.callback('Find Us 🔎📱', 'socialMedia'),
                ],
                [
                    Markup.button.callback('Help ❓💡', 'help'),
                ],
            ])
        });
        // Updating Database with new user details and adding new coins record for the new user if not present in the DB.
        const userRecord = await utils.addNewUser(ctx.from.id, ctx.from.first_name);
        const coinsRecord = await utils.addCoinsRecord(userRecord);
    })

}

function enableGracefulStop(bot) {
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = {
    launchBot,
}