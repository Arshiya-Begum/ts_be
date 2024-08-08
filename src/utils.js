const UserModel = require('./models/users.js')
const CoinsModel = require('./models/coins.js')

async function addCoinsRecord(telegramUser) {
    let coinsRecord = await CoinsModel.findOne({ user : telegramUser})
    if (!coinsRecord) {
        console.log("Adding Coins record....")
        coinsRecord = new CoinsModel({
            coinsEarned: 0,
            user: telegramUser,
        })
        coinsRecord = await coinsRecord.save()
        console.log('New Coins record added successfully!!!')
    }
    else {
        console.log('Coins record already exists!!!')
    }

    return coinsRecord;
}

async function addNewUser(id, userName) {
    let telegramUser = await UserModel.findOne({telegramID: id});

    if (!telegramUser) {
        telegramUser = new UserModel({
            telegramID: id,
            firstName: userName,
        });
        telegramUser = await telegramUser.save();
        console.log('New User with below details added successfully!!!');
      }
    else {
        console.log('User with below details already exisiting!!!');
    }
    
    console.log('Telegram ID :', telegramUser.telegramID);
    console.log('First Name :', telegramUser.firstName);

    return telegramUser;
}

module.exports = {
    addCoinsRecord,
    addNewUser,
}