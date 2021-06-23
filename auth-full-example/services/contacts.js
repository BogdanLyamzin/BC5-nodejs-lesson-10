const {Contact} = require("../models");

const getAll = (filter) => {
    return Contact.find(filter)
}

const getOne = (filter) => {
    return Contact.findOne(filter)
}

const add = (newContact) => {
    return Contact.create(newContact)
}