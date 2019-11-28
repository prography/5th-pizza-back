const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const login = async function(req, res){
    const access_token = req.body.x_kakao_token

    if (access_token) {
        const userInfo = await getUserInfo(access_token)
        const isExist = await models.Users.findOne({ where: { user_id: userInfo.id } })
        const token = jwt.sign( { user: userInfo.id }, process.env.PASSWORD_SECRET , { expiresIn: '7d' })

        if (isExist) { res.send( { data: isExist, access_token: token } ) }
        else {
            const user = {
                user_id: userInfo.id,
                email: userInfo.kakao_account.email,
                nickname: userInfo.properties.nickname,
                create_at: moment()
            }
            
            const result = await models.Users.create(user)

            if (result) { res.send({ data: result, access_token: token }) }
            else { throw new Error('Cannot create user') }
        }
    }

    else {
        throw new Error('kakao-token error')
    }
    
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
    login
}