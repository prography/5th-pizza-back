import { BaseChallenge, Challenge, Record } from '../models';
import moment from 'moment';
import { Op } from 'sequelize';
import { getAchievement } from '../utils/AchievementCalculator';
import { transformRecords } from './RecordController';

const getChallenges = async function(req ,res){
    const user = req.user
    const challenges = await user.getChallenges({ order: [[ {model: 'Challenges'}, 'created_at', 'DESC']] })
    const challengesWithMeta = await Promise.all(challenges.map(async (challenge) => ({
        ...challenge.toJSON(),
        achievement: await getAchievement(challenge, user),
        challengersNumber: (await (await challenge.getBaseChallenge()).getChallenges()).length
    })))
    const result = { 
        data: transformChallenges(challengesWithMeta)
    }
    res.send(result)
}

const getChallenge = async function(req, res){
    const id = req.params.challengeId;
    const challenge = await Challenge.findOne({ where: { id: id } });
    if (challenge) {
        const challengeWithMeta = {
            achievement: await getAchievement(challenge, req.user),
            challengersNumber: (await (await challenge.getBaseChallenge()).getChallenges()).length
        }
        res.send({ data: transformChallenge(challengeWithMeta) });
    }
    else {
        throw new Error('challenge does not exist')
    }
}

const getChallengeRecords = async function(req, res){
    const challengeId = req.params.challengeId
    const user = req.user
    const records = await Record.findAll({ 
        where: { user_id: user.id, challenge_id: challengeId },
        order: [['created_at', 'DESC']]
    }) 
    res.send({
        data: transformRecords(records)
    })
}

const findOrNewBaseChallenge = async (challengeBody) => {
    const baseChallenge = await BaseChallenge.findOne({
        where: {
            [Op.and]: [
                { routineType: challengeBody.routine_type },
                { objectUnit: challengeBody.object_unit },
                { quota: challengeBody.quota },
                { exerciseType: challengeBody.exercise_type }
            ]
        }
    })
    if (baseChallenge) {
        return baseChallenge;
    } else {
        return BaseChallenge.create({
            routineType: challengeBody.routine_type,
            objectUnit: challengeBody.object_unit,
            quota: challengeBody.quota,
            exerciseType: challengeBody.exercise_type,
        })
    }
}

const getEndDateByBaseChallengeType = (routineType) => {
    if(routineType === 'daily'){
        return moment().add(7, 'days');
    }
    else if(routineType === 'weekly'){
        return moment().add(1, 'months');
    }
    else{
        return moment().add(3, 'months');
    }
} 

const createChallenge = async function(req, res){
    const user = req.user
    const body = req.body

    // validation
    if (!body.quota) {
        res.send({ data: [{ error: 'quota value error' }] });
        return;
    }

    // baseChallenge 확인
    const baseChallenge = await findOrNewBaseChallenge(body);

    const payload = {
        start: moment(),
        end: getEndDateByBaseChallengeType(baseChallenge.routineType),
        success: false
    }

    const challenge = await Challenge.create(payload)
    await challenge.setUser(user);
    await challenge.setBaseChallenge(baseChallenge);

    res.send({
        data: [transformChallenge(challenge)],
    })
}

const deleteChallenge = async function(req, res){
    const id = req.params.challengeId
    const result = await Challenge.destroy({ where: { id } })
    if (result) {
        res.send({ data: result })
    }
    else {
        throw new Error('Cannot delete challenge')
    }
}

const transformChallenge = (challenge) => ({
    id: challenge.id,
    user_id: challenge.userId,
    base_challenge_id: challenge.baseChallengeId,
    start: challenge.start,
    end: challenge.end,
    success: challenge.success,
    achievement: challenge.achievement,
    challengersNumber: challenge.challengersNumber,
    created_at: challenge.createdAt,
    updated_at: challenge.updatedAt,
});

const transformChallenges = (challenges) => challenges.map(transformChallenge);

export default {
    getChallenges,
    getChallenge,
    getChallengeRecords,
    createChallenge,
    deleteChallenge
}