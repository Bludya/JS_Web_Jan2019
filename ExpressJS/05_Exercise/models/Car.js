const {Schema, model} = require('mongoose');

const carSchema = new Schema({
  model: {type: String, required: true},
  image: {type: String, required: true},
  pricePerDay: {type: Number, required: true},
  isRented: {type: Boolean, required: true, default: false},
})

const Car = model('Car', carSchema);

module.exports = Car;
