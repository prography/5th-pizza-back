const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const secretObj = require("../config/key");
const axios = require('axios')

const login = async function(req, res){
    const access_token = req.headers['x-kakao-token']
    console.log(access_token)
    
    if (access_token) {
        const userInfo = getUserInfo(access_token)
        const isExist = await models.Users.findOne({ where: { user_id: userInfo.id } })
        const token = jwt.sign( { user_id: userInfo.id }, secretObj )

        if (isExist) {
            
            const loginLog = {
                user_no: userInfo.id,
                log_in: moment()
            }
           
            const log = await models.UserLog.create(loginLog)
            if (!log) {
                throw new Error('Cannot create log')
            }

            res.send( { data: isExist, access_token: token } )
        }
        else {
            const user = {
                user_id: userInfo.id,
                email: userInfo.kakao_account.email,
                nickname: userInfo.properties.nickname
            }
            const result = await models.Users.create(user)
            
            if (result) {
                res.send({ data: result, access_token: token })
            }
            else {
                throw new Error('Cannot create user')
            }
        }
    }

    else {
        throw new Error('kakao-token error')
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

    return userInfo.data
}

module.exports = {
    login,
    logout
}