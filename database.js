const mongoose = require('mongoose');

const db = 'mongodb+srv://admin:admin@clusterfrick-4d7zp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db);

const schema = new mongoose.Schema({

    id: {
        type: Number
    },
    name: {
        type: String
    },
    screenshot:{
        type: String
    }

});

const Sensor = mongoose.model("Games", schema);

module.exports = Sensor;