const Car = require('../models/Car');
const Rent = require('../models/Rent');
const User = require('../models/User');

module.exports = {
  addGet: (req, res) => {
    res.render('car/add');
  },
  addPost: (req, res) => {
    let carBody = req.body;

    if(!carBody.model || !carBody.image || !carBody.pricePerDay){
      carBody.error = 'Please fill all fields.';
      res.render('car/add', carBody);
      return;
    }

    carBody.pricePerDay = Number(carBody.pricePerDay);

    Car.create(carBody).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    })
  },
  allGet: (req, res) => {
    let model = req.query.model;
    let searchQuery = {};

    if(model){
      searchQuery.model= {$regex : `.*${model}.*`};
    }

    Car.find(searchQuery).where({isRented: false}).then((cars) => {
      res.render('car/all', {cars});
      return;
    }).catch(console.error);
  },
  rentGet: (req, res) => {
    Car.findById(req.params.id).then((car) => {
      if(!car){
        res.redirect('../car/all')
        return;
      }

      res.render('car/rent', car);
      return;
    }).catch(console.error);
  },
  rentPost: (req, res) => {
    let id = req.params.id;
    let userId = req.user._id;
    let days = req.body.days;

    Car.findById(id).then((car) => {
      if(!car){
        redirect('../car/all');
        return;
      }

      days = Number(days);

      if(days < 1){
        car.error = "Days should be more than 0.";
        res.render('car/rent', car);
        return;
      }

      car.isRented = true;
      car.save();

      Rent.create({days, owner: userId, car})
      .then(() => {
        res.redirect('/car/all');
        return;
      }).catch(console.error);
    });
  },
  editGet: (req, res) => {
    let id = req.params.id;

    Car.findById(id)
    .then((car) => {
      if(!car){
        res.redirect('/car/all');
        return;
      }

      res.render('car/edit', car);
      return;
    })

  },
  editPost: (req,res) => {
    let id = req.params.id;
    let carBody = req.body;
    Car.findById(id)
    .then((car) => {
      if(!car){
        res.redirect('/car/all');
        return;
      }

      if(!carBody.model || !carBody.image || !carBody.pricePerDay){
        carBody.error = 'Please fill all fields.';
        res.render(`car/edit/${req.params.id}`, carBody);
        return;
      }

      car.model = carBody.model;
      car.image = carBody.image;
      car.pricePerDay = carBody.pricePerDay;

      car.save()
      .then(() => {
        res.redirect('/car/all')
        return;
      }).catch(console.error);
    })
  },
}
