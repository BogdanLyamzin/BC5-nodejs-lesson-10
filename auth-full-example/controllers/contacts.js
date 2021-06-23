const {contacts: service} = require("../services");

const getAll = async (req, res, next) => {
    try {
        const userContacts = await service.getAll({owner: req.user._id});
        res.json({
            status: "success",
            code: 200,
            data: {
                result: userContacts
            }
        })
    }
    catch(error){
        next(error)
    }
}

const getOne = async (req, res, next) => {
    const {id} = req.params;
    const {user} = req;
    try {
        const filter = {_id: id, owner: user._id};
        const contact = await service.getOne(filter);
    }
    catch(error){
        next(error)
    }
}

const add = async (req, res, next) => {
    const {body, user} = req;
    try {
        const newContact = {
            name: body.name,
            number: body.number,
            owner: user._id
        };
        const result = await service.add(newContact);
    }
    catch(error){
        next(error)
    }
}

module.exports = getAll