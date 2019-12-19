const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const kakaoLogin = async function(req, res){
    const access_token = req.headers['x-kakao-token']
    
    if (access_token) {
        const userInfo = await getUserInfo(access_token)
        let user = await models.Users.findOne({ where: { user_id: userInfo.id, type: 'kakao' }})
        if (!user) {
            const userPayload = {
                type: 'kakao',
                user_id: userInfo.id,
                email: userInfo.kakao_account.email,
                nickname: userInfo.properties.nickname,
                created_at: moment()
            }
            
            user = await models.Users.create(userPayload)
            if (!user) { throw new Error('Cannot create user') }
        }
        const token = jwt.sign({ user_id: user.id }, process.env.PASSWORD_SECRET , { expiresIn: '7d' })
        res.send({ data: user, access_token: token })
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
    kakaoLogin
}