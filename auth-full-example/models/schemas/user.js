const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    email: {
        type: String,
        required: [true, "Email must be exist"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be exist"]
    },
    token: {
        type: String,
        default: null
    }
});

// userSchema.pre("save", ()=>{
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
// });

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = userSchema;