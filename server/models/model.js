const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories_model = new Schema({
    type: { type: String, default: "Investment"},
    color: { type: String, default: "#FCBE44"}
})

const transaction_model = new Schema({
    name: { type: String, default: "Anonymous"},
    type: { type: String, default: "Investment"},
    amount: { type: Number, default: 0},
    date: { type: Date, default: Date.now},
})

const categories = mongoose.model('categories', categories_model)
const transaction = mongoose.model('transaction', transaction_model)

exports.default = transaction;
exports.default = categories;
module.exports = {
    categories,
    transaction
}