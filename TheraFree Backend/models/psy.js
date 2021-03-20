const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const psySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    adresse: {
        type: String,
        required:true
    },
    telephone: {
        type: String,
        required:true
    },
    specialisation: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

var Psy = mongoose.model('Psy', psySchema);

module.exports = Psy;
