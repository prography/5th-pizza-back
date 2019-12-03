'use strict'

module.exports = (sequelize, DataTypes) => {
    const serviceAccount = sequelize.define('ServiceAccount',{
        type: DataTypes.ENUM('g','k','f'),
        token: DataTypes.STRING,
        refresh: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE
    },
    {
        timestamps: false
    });

    serviceAccount.associate = function(models) {
        //todo: 관계 설정
    };
    return serviceAccount;
}