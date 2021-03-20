var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rdvSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    userid: {
        type: Number,
        required: true,
    },
    psyid: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

var Rdv = mongoose.model('Rdv', rdvSchema);

module.exports = Rdv;