const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    senderid: {
        type: Number,
        required: true
    },
    receiverid: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const convSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userid: {
        type: Number,
        required: true
    },
    psyid: {
        type: Number,
        required: true
    },
    messages:[messageSchema]
}, {
    timestamps: true
});

var Conv = mongoose.model('Conv', convSchema);

module.exports = Conv;