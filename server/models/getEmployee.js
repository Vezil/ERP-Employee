//TEST
module.exports = (sequelize, DataTypes) => {
    const getEmployee = sequelize.define('getEmployee', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATE
        },
    }
    )


    return getEmployee
}
