const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        telegramID: {
            type: String,
            unique: true,
            required: [true, 'Telegram ID is a required field.'],
        },
        firstName: {
            type: String,
            required: false,
        },
    },
    {
    timestamps: true,
    strictPopulate: false

    })

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;