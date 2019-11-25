const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const secretObj = require("../config/key");
const axios = require('axios')

const login = async function(req, res){
    const access_token = req.body.access_token
    
    if (access_token) {
        const userInfo = getUserInfo(access_token)
        const isExist = await models.Users.findOne({ where: { user_id: userInfo.id } })
        console.log(isExist)
        if (isExist) {
            const token = jwt.sign( { user_id: userInfo.id }, secretObj )
            
            const loginLog = {
                user_no: result.id,
                log_in: moment()
            }
           
            const log = await models.UserLog.create(loginLog)
            if (!log) {
                throw new Error('Cannot create log')
            } 

            res.cookie({ user_id: userInfo.id }, token)
            res.send({ data: result })

        }
        else {
            const user = {
                user_id: userInfo.id,
                email: userInfo.kakao_account.email,
                nickname: userInfo.properties.nickname
            }
            axios.post('/users', user)
        }
    }

    else {
        throw new Error('kakao access token error')
    }
    
}


const logout = function(req, res) {
    
}

const getUserInfo = async function(access_token) {
   const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', 
    {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return userInfo
}

module.exports = {
    login,
    logout
}