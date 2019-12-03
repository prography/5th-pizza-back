'use strict'

module.exports = (sequelize, DataTypes) => {
    const userChallenges = sequelize.define('UserChallenges',{
        user_id: DataTypes.INTEGER,
        challenge_id: DataTypes.INTEGER
    },
    {
        timestamps: false
    });

    userChallenges.associate = function(models) {
        //todo: 관계 설정
    };
    return userChallenges;
}