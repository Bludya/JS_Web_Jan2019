const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.connect('mongodb://root:root123@ds349045.mlab.com:49045/react_exercise_04', {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        User.seedAdminUser().then(() => {
            console.log('Database ready');
        }).catch((reason) => {
            console.log('Something went wrong');
            console.log(reason);
        });
    });
    db.on('error', reason => {
        console.log(reason);
    });
};
