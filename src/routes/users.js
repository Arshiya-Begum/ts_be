const express = require('express');
const router = express.Router();
const UserModel = require('../models/users.js')
const utils = require("../utils.js")

router.get(
    '/profile/:userId',
    async (req, res) => {
        try {
            const user = await UserModel.findOne({telegramID:req.params.userId})
            if (!user) {
                console.log("User not found")
                return res.status(400).json({message: 'User not found. Invalid User!!!'})
            }
            return res.json(user)    
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
);

router.post(
    '/profile/add',
    async (req, res) => {
        try {
            const {id, userName} = req.body;
            const user = await UserModel.findOne({telegramID:id})
            if (!user) {
                newUser = new UserModel({
                    telegramID: id,
                    firstName: userName,
                });
                newUser = await newUser.save();
                console.log('New User added successfully!!!');

                const coinsRecord = await utils.addCoinsRecord(newUser);
                console.log('New Coins record also added successfully!!!');
                
                return res.status(201).json({message: 'New User added successfully.'});
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
);

module.exports = router