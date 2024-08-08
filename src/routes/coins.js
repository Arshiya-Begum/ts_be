const express = require('express');
const router = express.Router();
const UserModel = require('../models/users.js')
const CoinsModel = require('../models/coins.js')
const utils = require('../utils.js')

router.get(
    '/:telegramId',
    async (req, res) => {
        try {
            const userRecord = await UserModel.findOne({telegramID:req.params.telegramId})
            if(!userRecord) {
                console.log("User not found")
                return res.status(400).json({message: 'User not found. Invalid User!!!'})
            }

            const coinsRecord = await CoinsModel.findOne({user: userRecord})
            if(!coinsRecord) {
                console.log("Coins record not found for the user")
                coinsRecord = await utils.addCoinsRecord(userRecord)
            }
            else {
                console.log("Coins record found for the user")
            }
            return res.json({coins: coinsRecord.coinsEarned})
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
);

router.put(
    '/coinScored',
    async (req, res) => {
        try {
            const {inputId, coinsScored} = req.body;
            const userRecord = await UserModel.findOne({telegramID:inputId})
            if(!userRecord) {
                console.log("User not found")
                return res.status(400).json({message: 'User not found. Invalid User!!!'});
            }

            const rec= await CoinsModel.findOneAndUpdate({user: userRecord}, {coinsEarned: coinsScored}, {new:true});
            if (!rec) {
                console.log("Coins record of the given user id not present in the DB.");
                const coinsRecord = new CoinsModel({
                    coinsEarned: coinsScored,
                    user: userRecord,
                })
                const newRec = await coinsRecord.save()
                console.log("Added coins record of the given user id in the DB.");
            }
            console.log("Coins Score updated for the given user successfully!!!")
            return res.status(201).json({message: "Coins Score updated for the given user successfully!!!"});
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
);

module.exports = router