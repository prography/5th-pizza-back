const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

const setAchievement = function (challenge, user) {
    if (challenge.routine_type == 'daily') {
        setDailyAchievement(challenge, user)
    }
    else if (challenge.routine_type == 'weekly') {
        setWeeklyAchievement(challenge, user)
    }
    else if (challenge.routine_type == 'monthly') {
        setMonthlyAchievement(challenge, user)
    }
    else {
        throw new Error('Wrong Challenge')
    }
}

const setDailyAchievement = function(challenge, record){
    if (challenge.object_unit == 'time') {
        if (record.running_time >= challenge.quota) {
            return { achievement: 100 }
        }
        else return { achievement: 0 }
    }
    else {
        if (record.distance >= challenge.quota){
            return { achievement: 100 }
        }
        else return { achievement: 0 }
    }
}

const setWeeklyAchievement = function(challenge, user){
    const total = 0
    if (challenge.object_unit == 'time') {
        total = await models.Records.sum('running_time', 
        { where: 
            {[Op.and]: [
                { challege_id: challenge.id }, 
                { user_id: user.id }, 
                { created_at: {[Op.between]: [ challenge.created_at, moment()]}}
            ]}
        })
    }
    else if (challenge.object_unit == 'distance') {
        total = await models.Records.sum('distance', 
        { where: 
            {[Op.and]: [
                { challege_id: challenge.id }, 
                { user_id: user.id }, 
                { created_at: {[Op.between]: [ challenge.created_at, moment()]}}
            ]}
        })
    }
    else {
        throw new Error('Wrong object unit')
    }
    const achievement = (total / challenge.quota) * 100
    return { achievement: achievement }
}

const setMonthlyAchievement = function(challenge, record){
    if (challenge.object_unit == 'time') {

    }
    else {
    }
}

module.exports = { setAchievement }