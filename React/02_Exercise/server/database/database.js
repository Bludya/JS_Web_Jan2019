const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.connect('mongodb://root:root123@ds139435.mlab.com:39435/react_ex2', {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        }

        console.log('Database ready');
    });

    db.on('error', reason => {
        console.log(reason);
    });
};
