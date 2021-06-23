const express = require("express");

const useAuth = require("./useAuth");
const {contacts: ctrl} = require("../controllers");

const router = express.Router();

router.post("/", express.json(), useAuth, ctrl.add);