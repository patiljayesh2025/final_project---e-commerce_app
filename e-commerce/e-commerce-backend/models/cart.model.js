const customer = require("./customer.model");

module.exports = (sequelize, Sequelize) => {

    const cart = sequelize.define("cart", {

        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        userid: {
            foreignKey: true,
            type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
        image: Sequelize.STRING,

    }, { timestamps: false, freezeTableName: true });
    return cart;

};