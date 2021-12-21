module.exports = (sequelize, Sequelize) => {

    const product = sequelize.define("product", {

        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
        image: Sequelize.STRING,



    }, { timestamps: false, freezeTableName: true });


    return product;

};