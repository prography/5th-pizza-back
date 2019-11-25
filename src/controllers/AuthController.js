const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
const secretObj = require("../config/token");
const request = require('request')

const Op = sequelize.Op;

const login = async function(req, res){
    const access_token = req.body.access_token
    
    if (access_token) {
        const user_id = getUserId(access_token)
        const result = await models.Users.findOne({ where: {user_id: user_id} })

        if (result) {
            const token = jwt.sign( { user_id: user_id }, secretObj )
            
            const log = {
                user_no: result.id,
                log_in: moment()
            }
           
            models.UserLog.create(log)

            res.cookie({ user_id: user.user_id }, token)
            res.send({ data: result })

        }
        else {
            
        }
    }

    else {
        throw new Error('kakao access token error')
    }
    
}

const logout = function(req, res) {
    
}

const getUserId = function(access_token) {
    
    const options = {
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    const callback = function(error, response, body){
        if(!error && response.statusCode == 200){
            const user_info = JSON.parse(body)
            const user_id = user_info.id
            return user_id
        }
    }
    
    request(options, callback)
}

module.exports = {
    login,
    logout
}