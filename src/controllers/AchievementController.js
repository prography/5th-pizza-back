const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

const setAchievement = function (req, res){
    const body = req.body
    const challenge_id = body.challege_id
    const challenge = await models.Challenges.findOne({ where: { id: challenge_id }})
    if (challenge.routine_type == 'daily') {
        setDailyAchievement(challenge, record)
    }
    else if (challenge.routine_type == 'weekly') {
        setWeeklyAchievement(challenge, record)
    }
    else if (challenge.routine_type == 'monthly') {
        setMonthlyAchievement(challenge, record)
    }
}

const setDailyAchievement = function(challenge, record){
    if (challenge.object_unit == 'time') {
        if (record.running_time >= quota) {
            
        }
    }
    else {
        if (record.distance >= quota){

        }
    }
}

const setWeeklyAchievement = function(challenge, record){
    if (challenge.object_unit == 'time') {
        const total = await model.Records.sum('running_time', { where: { challege_id: challenge.id }})
        const achievement = (total / challenge.quota)*100
        return achievement
    }
}

const setMonthlyAchievement = function(challenge, record){
    if (challenge.object_unit == 'time') {
        if (record.running_time >= quota){
            
        }
        else {}
    }
    else {
        if (record.distance >= quota) {
        }
        else {}
    }
}