const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
const secretObj = require("../config/token");

const Op = sequelize.Op;

const login = async function(req, res){
    const user_id = req.body.user_id
    const user_pw = req.body.user_pw

    const result = models.Users.findOne({ where: { [Op.and]: [{user_id: user_id} , {password: user_pw}] } })
    if (result) {
        const token = jwt.sign({ user_id: user_id }, secretObj, { expiresIn: '7d' })       
    }     
}

const logout = function(req, res){

}

module.exports = {
    login,
    logout
}