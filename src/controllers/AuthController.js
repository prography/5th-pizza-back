const models = require('../models')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');

const login = async function(req, res){
    const access_token = req.headers['x-social-token']
    const type = req.params.type

    if (access_token) {
        const userInfo = await getUserInfo(type, access_token)
        let user = await models.Users.findOne({ where: { user_id: userInfo.id, type: type }})
        
        if (!user) {
            const userPayload = await makeUserPayload(type, userInfo)
            user = await models.Users.create(userPayload)
            if (!user) { throw new Error('Cannot create user') }
        }
        const token = jwt.sign({ user_id: user.id }, process.env.PASSWORD_SECRET , { expiresIn: '7d' })
        res.send({ data: user, access_token: token })
    }
    else {
        throw new Error('social token error')
    }
}

const getUserInfo = async function(type, access_token) {
    const requestUrl = {
        kakao: 'https://kapi.kakao.com/v2/user/me',
        google: `https://oauth2.googleapis.com/tokeninfo?id_token=${access_token}`,
        facebook: `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`,
        naver: 'https://openapi.naver.com/v1/nid/me'
    }
    const userInfo = await axios.get(requestUrl[type], 
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    console.log(userInfo.data)
    if (type == 'naver')
        return userInfo.data.response
    else
        return userInfo.data
}

const makeUserPayload = async function(type, userInfo){
    const userPayload = {
        type: type,
        created_at: moment()
    }
    if (type === 'kakao'){
        userPayload.user_id = userInfo.id
        userPayload.email = userInfo.kakao_account.email
        userPayload.nickname = userInfo.properties.nickname
        }
    // else if (type === 'google'){
    //     userPayload.user_id = ''
    //     userPayload.email = userInfo.email
    //     userPayload.nickname = userInfo.name
    // }
    else {
        userPayload.user_id = userInfo.id
        userPayload.email = userInfo.email
        userPayload.nickname = userInfo.name
    }
    return userPayload
}

module.exports = {
    login
}