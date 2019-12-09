'use strict'

module.exports = (sequelize, DataTypes) => {
    const serviceAccount = sequelize.define('ServiceAccount',{
        type: DataTypes.ENUM('google','kakao','facebook'),
        token: DataTypes.STRING,
        refresh: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE
    },
    {
        timestamps: false
    });

    serviceAccount.associate = function(models) {
        //serviceAccount.hasOne(models.Users, { foreignKey: 'user_id' });
    };
    return serviceAccount;
}