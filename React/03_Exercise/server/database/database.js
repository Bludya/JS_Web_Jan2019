const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.connect('mongodb://root:root123@ds145555.mlab.com:45555/react_ex03', {
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
