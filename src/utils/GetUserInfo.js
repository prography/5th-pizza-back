import moment from 'moment';
import axios from 'axios';

const getUserInfo = async function(type, access_token) {
    let userInfo
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
        userPayload.user_id = userInfo.id
        userPayload.email = userInfo.kakao_account.email
        userPayload.nickname = userInfo.properties.nickname
        }
    else if (type === 'google'){
        userPayload.user_id = ''
        userPayload.email = userInfo.email
        userPayload.nickname = userInfo.name
    }
    else {
        userPayload.user_id = userInfo.id
        userPayload.email = userInfo.email
        userPayload.nickname = userInfo.name
    }
    return userPayload
}

export default {
    getUserInfo,
    setUserPayload
}
