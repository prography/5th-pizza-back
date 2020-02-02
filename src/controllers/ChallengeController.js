import { BaseChallenge, Challenge, Record } from '../models';
import moment from 'moment';
import { Op } from 'sequelize';
import { getAchievement } from '../utils/AchievementCalculator';
import { transformRecords } from './RecordController';
import { DuplicateChallengeError } from '../errors/DuplicateChallengeError';
import { NotFoundChallengeError } from '../errors/NotFoundChallengeError';
import { Ranking } from '../utils/Ranking';
import { QuotaError } from '../errors/QuotaError';

const getChallenges = async function(req ,res){
    const user = req.user
    const challenges = await user.getChallenges({ order: [[ {model: 'Challenges'}, 'created_at', 'DESC']] })
    const challengesWithMeta = await Promise.all(challenges.map(async (challenge) => {
        const baseChallenge = await challenge.getBaseChallenge();
        return {
            ...challenge.toJSON(),
            baseChallenge,
            achievement: await getAchievement(challenge, user),
            challengersNumber: (await baseChallenge.getChallenges()).length,
        }
    }))
    const result = { 
        data: transformChallenges(challengesWithMeta)
    }
    res.send(result)
}

const getChallenge = async function(req, res, next){
    const user = req.user;
    const id = req.params.challengeId;
    const challenge = await Challenge.findOne({ where: { id: id } });
    if (challenge) {
        const ranks = await Ranking(challenge);
        const baseChallenge = await challenge.getBaseChallenge();
        const challengeWithMeta = {
            baseChallenge,
            ranks,
            achievement: await getAchievement(challenge, req.user),
            challengersNumber: (await baseChallenge.getChallenges()).length,
        }
        res.send({ data: transformChallenge(challengeWithMeta) });
    }
    else {
        next(new NotFoundChallengeError('존재하지 않는 challenge'));
        return;
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

const createChallenge = async function(req, res, next){
    const user = req.user
    const body = req.body

    // validation
    if (!body.quota) {
        next(new QuotaError('Quata 정보 없음'));
        return;
    }

    // baseChallenge 확인
    const baseChallenge = await findOrNewBaseChallenge(body);

    //끝나기 전인 동일한 challenge 확인
    if(await hasSameChallenge(user, baseChallenge)){
        next(new DuplicateChallengeError());
        return;
    }

    const payload = {
        start: moment(),
        end: getEndDateByBaseChallengeType(baseChallenge.routineType),
        success: false
    }

    let challenge = await Challenge.create(payload)
    await challenge.setUser(user);
    await challenge.setBaseChallenge(baseChallenge);
    challenge = await Challenge.findOne({ where: { id: challenge.id }, include: ['baseChallenge'] });
    res.send({
        data: transformChallenge(challenge),
    })
}

const deleteChallenge = async function(req, res){
    const id = req.params.challengeId
    const result = await Challenge.destroy({ where: { id } })
    if (result) {
        res.send({ data: result })
    }
    else {
        next(new NotFoundChallengeError('존재하지 않는 challenge'));
        return;
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
    base_challenge: {
        routine_type: challenge.baseChallenge.routineType,
        object_unit: challenge.baseChallenge.objectUnit,
        exercise_type: challenge.baseChallenge.exerciseType,
        quota: challenge.baseChallenge.quota,
    },
    ranks: challenge.ranks ? challenge.ranks : undefined,
});

const transformChallenges = (challenges) => challenges.map(transformChallenge);

const hasSameChallenge = async (user, baseChallenge) => {
    const end = {[Op.gte]: moment().format('YYYY-MM-DD 00:00:00')};
    const challenge = await user.getChallenges({
        where: {baseChallengeId: baseChallenge.id, end},
        logging: console.log
    });
    return challenge.length;
}

export default {
    getChallenges,
    getChallenge,
    getChallengeRecords,
    createChallenge,
    deleteChallenge
}