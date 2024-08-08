const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoinsSchema = new Schema({
    coinsEarned: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true,
        required: [true, 'User is a required field.'],
    },
},
{
  timestamps: true,
  strictPopulate: false
})

const CoinsModel = mongoose.model('coins', CoinsSchema);

module.exports = CoinsModel;