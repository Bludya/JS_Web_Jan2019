const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const User = require('../models/User')

>>>>>>> a530bef6a0f1863842e254556e0c8259ea06166f
mongoose.Promise = global.Promise;
module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
<<<<<<< HEAD
    });       
=======
    });
>>>>>>> a530bef6a0f1863842e254556e0c8259ea06166f
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
<<<<<<< HEAD
        } 
    });

    db.on('error', reason => {
        console.log(reason);
    });
};
=======
        }

        User.seedAdminUser().then(() => {
          console.log('Database ready!')
        }).catch((e)=>{
          console.log('Something went wrong with the DB.');
          console.log(e);
        })
    });

    db.on('error', reason => {

        console.log('Something went wrong with the DB.');
        console.log(reason);
    });
};
>>>>>>> a530bef6a0f1863842e254556e0c8259ea06166f
