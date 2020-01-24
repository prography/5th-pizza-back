import moment from 'moment';
import axios from 'axios';
import { UserType } from '../models/User';

const getFakeUserInfo = (type) => {
    const fakeNickname = 'pizzaNick'
    const fakeEmail = 'sample@pizza.com'
    const fakeUserId = 123
    switch (type) {
        case UserType.Kakao:
            return {
                id: fakeUserId,
                    kakao_account: {
                        email: fakeEmail,
                    },
                    properties: {
                        nickname: fakeNickname,
                    }
            }
            case UserType.Google:
                return {
                    email: fakeEmail,
                    name: fakeNickname,
                }
            default:
                return {
                    id: fakeUserId,
                    email: fakeEmail,
                    name: fakeNickname
                }
    }
}

const getUserInfo = async function(type, access_token) {
    if (process.env.APP_ENV === 'test') {
        return getFakeUserInfo(type)
    }
    let userInfo = null;
    const requestUrl = {
        kakao: 'https://kapi.kakao.com/v2/user/me',
        google: `https://oauth2.googleapis.com/tokeninfo?id_token=${access_token}`,
        facebook: `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`,
        naver: 'https://openapi.naver.com/v1/nid/me'
    }
    if (type === 'kakao'){
       userInfo = getKakaoUserInfo(requestUrl[type], access_token)
    }
    else if (type === 'google'){
        userInfo = getGoogleUserInfo(requestUrl[type])
    }
    else if( type === 'facebook' ){
        userInfo = getFacebookUserInfo(requestUrl[type], access_token)
    }
    else {
        userInfo = getNaverUserInfo(requestUrl[type], access_token)
    }
    return userInfo
}

const getKakaoUserInfo = async function(url, access_token) {
    const userInfo = await axios.get(url, 
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    return userInfo.data
}

const getGoogleUserInfo = async function(url){
    const userInfo = await axios.get(url);

    return userInfo.data
}

const getFacebookUserInfo = async function(url, access_token){
    const userInfo = await axios.get(url, 
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    return userInfo.data
}

const getNaverUserInfo = async function(url ,access_token){
    const userInfo = await axios.get(url, 
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    return userInfo.data.response
}

const setUserPayload = async function(type, userInfo){
    const userPayload = {
        type: type,
        created_at: moment()
    }
    if (type === 'kakao'){
        userPayload.userId = userInfo.id
        userPayload.email = userInfo.kakao_account.email
        userPayload.nickname = userInfo.properties.nickname
        }
    else if (type === 'google'){
        userPayload.userId = ''
        userPayload.email = userInfo.email
        userPayload.nickname = userInfo.name
    }
    else {
        userPayload.userId = userInfo.id
        userPayload.email = userInfo.email
        userPayload.nickname = userInfo.name
    }
    return userPayload
}

export {
    getUserInfo,
    setUserPayload
}
