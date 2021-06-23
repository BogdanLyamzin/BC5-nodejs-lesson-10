const User = require("../models");
// {email}
const getOne = (filter) => {
  return User.findOne(filter); // User.findOne({email: filter})
};

const getById = (id) => {
  return User.findById(id);
}
/* 
?page=3&per_page=10
const {page, per_page} = req.params;
const skip = per_page * (page - 1);
const limit = per_page;
User.find(filter, {email, name}, {skip, limit})
*/
const add = ({email, password}) => {
  const newUser = new User({email});
  newUser.setPassword(password);
  return newUser.save();
};

const update = (id, data) => {
  User.findByIdAndUpdate(id, data);
}

module.exports = {
  getOne,
  getById,
  add,
  update
};
