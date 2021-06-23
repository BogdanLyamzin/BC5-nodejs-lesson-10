const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./api");

const app = express();

require("./configs/config-passport");

app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded());

app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/users", routes.users);
app.use("/api/v1/contacts", routes.contacts);

app.use((_, res)=>{
    res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
    })
});

app.use((error, _, res, __)=>{
    const {code = 500, message = "Server error"} = error;
    res.status(code).json({
        status: "fail",
        code,
        message
    })
});

const {DB_HOST, PORT} = process.env;
console.log(DB_HOST);
mongoose.connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    const port = PORT || 3000;
    app.listen(port)
}).catch(error => console.log(error))