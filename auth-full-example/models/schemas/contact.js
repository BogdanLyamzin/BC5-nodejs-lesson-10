const {Schema, ObjectId} = require("mongoose");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, "Name must be exist"]
    },
    number: {
        type: Number,
        required: [true, "Number must be exist"]
    },
    owner: {
        type: ObjectId,
        ref: "user"
    }
});

module.exports = contactSchema;