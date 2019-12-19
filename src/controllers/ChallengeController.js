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
    const user = req.user
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
            {routine_type: challenge.routine_type},
            {object_unit: challenge.object_unit},
            {quota: challenge.quota},
            {exercise_type: challenge.exercise_type}
        ]}
    })

    if (isExist) {
        const result = await user.addChallenge(isExist)
        if (result) res.send({ data: result })
        else throw new Error('Cannot create UserChallenge')
    } else {
        const newChallenge = await models.Challenges.create(challenge)
        const result = await user.addChallenge(newChallenge)
        if (newChallenge) res.send({ data: result })
        else throw new Error('Cannot create challenge')
    }
}

const deleteChallenge = async function(req, res){
    const user = req.user
    const id = req.params.challenge
    const result = await models.UserChallenges.destroy({ where: { user_id: user.id , challenge_id: id} })
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