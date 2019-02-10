const {Schema, model} = require('mongoose')

let rentSchema = new Schema({
  days: {type: Number, required: true},
  car: {type: Schema.Types.ObjectId, required:true, ref: 'Car'},
  owner: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
})

const Rent = model('Rent', rentSchema);
module.exports = Rent;
