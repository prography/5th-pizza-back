import { getAchievement } from "./AchievementCalculator"

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
    Ranking
}