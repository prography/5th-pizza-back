const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;
const { getAchievement } = require('../utils/AchievementCalculator')

const getChallenges = async function(req ,res){
    const user = req.user
    const challenges = await user.getBaseChallenges({ order: [[ {model: 'UserChallenges'}, 'createdAt', 'DESC']] })
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
    const id = req.params.challengeId;
    const challenge = await models.BaseChallenges.findOne({ where: { id: id } });
    if (challenge) {
        res.send({ data: challenge });
    }
    else {
        throw new Error('challenge does not exist')
    }
}

const getChallengeRecords = async function(req, res){
    const challengeId = req.params.challengeId
    const user = req.user
    const records = await models.Records.findAll({ 
        where: { user_id: user.id, challenge_id: challengeId },
        order: [['created_at', 'DESC']]
    }) 
    res.send({ data: records })
}

const createChallenge = async function(req, res){
    const user = req.user
    const body = req.body

    if (!body.quota) {
        res.send({ data: [{ error: 'quota value error'}] })
    } else {
        const challenge = {
            routine_type: body.routine_type,
            object_unit: body.object_unit,
            quota: body.quota,
            exercise_type: body.exercise_type,
            created_at: moment()
        }
    
        const isExist = await models.BaseChallenges.findOne({ where: {
            [Op.and]: [ 
                {routine_type: challenge.routine_type},
                {object_unit: challenge.object_unit},
                {quota: challenge.quota},
                {exercise_type: challenge.exercise_type}
            ]}
        })
    
        if (isExist) {
            const result = await user.getBaseChallenges({ where: { id: isExist.id }})
            if (result.length) {
                res.send({ 
                    data: await Promise.all(result.map(async (challenge) => ({ 
                        ...challenge.toJSON(), 
                        UserChallenges: undefined })))
                    })
                }
            else {
                await user.addBaseChallenge(isExist)
                res.send({ data: [isExist] })
            }
        } else {
            const newChallenge = await models.BaseChallenges.create(challenge)
            await user.addBaseChallenge(newChallenge)
            if (newChallenge) res.send({ data: [newChallenge] })
            else throw new Error('Cannot create challenge')
        }
    }
}

const deleteChallenge = async function(req, res){
    const user = req.user
    const id = req.params.challengeId
    const challenge = await models.BaseChallenges.findOne({ where: { id: id } })
    const result = await user.removeChallenge(challenge)
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
    getChallengeRecords,
    createChallenge,
    deleteChallenge
}