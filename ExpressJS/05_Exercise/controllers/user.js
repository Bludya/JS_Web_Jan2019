const encryption = require('../util/encryption')
const User = require('../models/User')
const Rent = require('../models/Rent')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
       let userBody = req.body;

       if(!userBody.username || !userBody.password || !userBody.repeatPassword){
         userBody.error = "Please fill all fields.";
         res.render('user/register', userBody);
         return;
       }

       if(userBody.password !== userBody.repeatPassword){
         userBody.error = "Both passwords should match.";
         res.render('user/register', userBody);
         return;
       }

       let salt = encryption.generateSalt();
       let hashedPass = encryption.generateHashedPassword(salt, userBody.password);

       try {
         let user = await User.create({
           username: userBody.username,
           hashedPass,
           salt,
           firstname: userBody.firstname,
           lastname: userBody.lastname,
           roles:['User']
         })

         req.login(user, (err) => {
           if(err){
             userBody.error = err;
             res.render('user/register', userBody);
           } else {
             res.redirect('/');
           }
         })
       } catch (e) {
         console.log(e);
       }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/')
    },
    loginGet: (req, res) => {
      res.render('user/login');
    },
    loginPost: async (req, res) => {
      let userBody = req.body;
      try {
        let user = await User.findOne({username: userBody.username});

        if(!user){
          userBody.error = "User with that username not found.";
          res.render('user/login', userBody);
          return;
        }

        if(!user.authenticate(userBody.password)){
          userBody.error = "Password is incorrect.";
          res.render('user/login', userBody);
          return;
        }

        req.logIn(user, (err) => {
          if(err){
            userBody.error = err;
            res.render('user/login', userBody);
          }else {
            res.redirect('/')
          }
        })
      } catch (e) {
        userBody.error = e;
        res.render('user/login', userBody);
      }

    },
    rentsGet: (req, res) => {
      let userId = req.user._id;

      Rent.find({owner: userId})
        .populate('car')
        .then((rents) => {
          let cars = [];

          for(let rent of rents){
            let car = rent.car;
            car.expiresIn = rent.days;
            cars.push(rent.car);
          }

          res.render('user/rented', {cars})
        })
    }

};
