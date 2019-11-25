const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
const secretObj = require("../config/token");

const Op = sequelize.Op;

const login = async function(req, res){
    const kakao_token = res.body.access_token
    const user = {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw
    }
    
    if (kakao_token) {
        const result = await models.Users.findOne({ where: { [Op.and]: [{user_id: user.user_id} , {password: user.user_pw}] } })

        if (result) {
            const token = jwt.sign({ user_id: user_id }, secretObj, { expiresIn: '7d' })
            const log = {
                user_no: result.id,
                log_in: moment()
            }
            res.cookie({user_id: user.user_id}, token)
            res.send({ data: result })

        }
        else {
            throw new Error('Unverified user')
        }
    }
    else {
        throw new Error('kakao access token error')
    }
    
}

const logout = function(req, res){
    const user_id = req.body.id
    res.clearCookie({user_id: user_id})
}

module.exports = {
    login,
    logout
}