module.exports = (sequelize, Sequelize) => {

    const customer = sequelize.define("customer", {

        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,

    }, { timestamps: false, freezeTableName: true });


    return customer;

};