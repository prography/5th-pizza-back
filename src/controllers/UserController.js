const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

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
    deleteUser
}