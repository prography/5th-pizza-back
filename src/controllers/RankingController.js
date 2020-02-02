import { getAchievement } from "../utils/AchievementCalculator"
import { Challenge } from "../models";

const getRanking = async function(req, res, next){
    const id = req.params.challengeId;
    const challenge = await Challenge.findOne({ where: { id: id } });
    if (challenge) {
        const ranks = await Ranking(challenge);
        res.send({ data: {
            ranks: ranks
        }});
    }
    else {
        next(new NotFoundChallengeError('존재하지 않는 challenge'));
        return;
    }
}

const Ranking = async (challenge) => {
    const baseChallenge = await challenge.getBaseChallenge();
    const challenges = await baseChallenge.getChallenges({ include: ['user'] });
    const achivements = await Promise.all(challenges.map(async (item) => {
        const userAchivement = await getAchievement(item, item.user);
        return {
            user: item.user,
            achivement: userAchivement,
        }
    }))
    return achivements.sort((a, b) => b.achivement - a.achivement)
}

export {
    getRanking
}