const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;
const { getAchievement } = require('../utils/AchievementCalculator')

const getChallenges = async function(req ,res){
    const user = req.user
    const challenges = await user.getChallenges()
    const result = { 
        data: await Promise.all(challenges.map(async (challenge) => ({ 
            ...challenge.toJSON(), 
            UserChallenges: undefined,
            achievement: await getAchievement(challenge, user),
            challengersNumber: (await challenge.getUsers()).length 
        })))
    }
    res.send(result)
}

const getChallenge = async function(req, res){
    const id = req.params.challenge;
    const challenge = await models.Challenges.findOne({ where: { id: id } });
    if (challenge) {
        res.send({ data: challenge });
    }
    else {
        throw new Error('challenge does not exist')
    }
}

const createChallenge = async function(req, res){
    const user = req.user.user_id
    const body = req.body
    const challenge = {
        routine_type: body.routine_type,
        object_unit: body.object_unit,
        quota: body.quota,
        exercise_type: body.exercise_type,
        created_at: moment()
    }

    const isExist = await models.Challenges.findOne({ where: {
        [Op.and]: [ 
            {routine_type: challenges.routine_type},
            {object_unit: challenges.object_unit},
            {quota: challenges.quota},
            {exercise_type: challenges.exercise_type}
        ]}
    })

    if (isExist) {
        const userChallenge = {
            user_id: user,
            challenge_id: isExist.id,
            created_at: moment()
        }
        const result = await models.UserChallenges.create(userChallenge)
        if (result) res.send({ data: result })
        else throw new Error('Cannot create UserChallenge')
    }

    else{
        const newChallenge = await models.Challenges.create(challenge)
        const userChallenge = {
            user_id: user,
            challenge_id: newChallenge.id,
            created_at: moment()
        }
        const result = await models.UserChallenges.create(userChallenge)
        if (newChallenge) res.send({ data: result })
        else throw new Error('Cannot create challenge')
    }
}

const deleteChallenge = async function(req, res){
    const id = req.params.challenge
    const result = await models.Challenges.destroy({ where: { id: id } })
    if (result) {
        res.send({ data: result })
    }

    else {
        throw new Error('Cannot delete challenge')
    }
}

module.exports = {
    getChallenges,
    getChallenge,
    createChallenge,
    deleteChallenge
}