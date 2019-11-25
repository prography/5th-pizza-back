const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

const createUser = async function(req, res){
    const body = req.body
    const user = {
        user_id: body.user_id,
        email: body.email,
        nickname: body.nickname,
        created_at: moment()
    }

    const result = await models.Users.create(user)
    res.send({ data: result })
}

const deleteUser = async function(req, res){
    const result = await models.Users.destroy({ where: { user_id: req.params.user_id } })
    if (result) {
        res.send({ data: result })
    }
    
    else {
        throw new Error('Cannot delete user')
    }
}


module.exports = {
    createUser,
    deleteUser
}