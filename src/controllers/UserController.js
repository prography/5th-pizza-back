const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

const createUser = async function(req, res){
    const body = req.body
    const user = {
        user_id: body.user_id,
        password: body.user_pw,
        created_at: moment()
    }

    const isExist = await models.Users.findOne({ where: { user_id: user.user_id  } })
    if (isExist) {
        throw new Error('duplicate user')
    }
    else {
        const result = await models.Users.create(user)
        res.send({ data: result })
    }
}

const deleteUser = function(req, res){
    const id = req.params.user
    const result = await models.Users.destroy({ where: {id: id} })
    if (result) {
        res.send({ data: result })
    }
    
    else {
        throw new Error('Cannot delete user')
    }
}


module.exports = {
    createUser,
    updateUser,
    deleteUser
}