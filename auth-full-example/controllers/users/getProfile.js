const jwt = require("jsonwebtoken");
require("dotenv").config();

const {users: service} = require("../../services");
const getProfile = async (req, res, next) => {
    try {

        res.json({
            status: "success",
            code: 200,
            data: {
                result: req.user
            }
        })
    }
    catch(error){
        res.status(401).json({
            status: "error",
            code: 403,
            message: "Invalid token"
        })
    }
}

module.exports = getProfile;