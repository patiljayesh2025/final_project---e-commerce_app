const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const fileUpload = require('express-fileupload');
const details = require('./details.json');
const nodemailer = require("nodemailer");
app.use(fileUpload())
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
sequelize.sync().then(() => console.log("synced")).catch(err => console.log(err));
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
sequelize.authenticate().then(() => { console.log("Connected to the database") }).catch((err) => { console.log("unable to connect to database" + err) })
db.customer = require("./models/customer.model.js")(sequelize, Sequelize);
db.product = require("./models/product.model.js")(sequelize, Sequelize);
db.cart = require("./models/cart.model.js")(sequelize, Sequelize);
const product = db.product;
const customer = db.customer;
const cart = db.cart;
cart.belongsTo(customer, { foreignKey: 'userid', targetKey: 'id' });


app.get('/getAllCustomers', function(req, res) {


    customer.findAll({ raw: true }).
    then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error Occured " + err))

})
app.post

app.get('/getAllProducts', function(req, res) {


    product.findAll({ raw: true }).
    then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error Occured " + err))

});
app.get('/getMyCart/:Id', function(req, res) {

    cart.findAll({ where: { userid: req.params.Id } }).
    then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error Occured " + err))


})



app.post('/insertCustomerData', async function(req, res) {
    const myCustomer = {

        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,


    }
    customer.create(myCustomer)
        .then((data) => res.status(200).send("Record submitted successfully"))
        .catch(err => res.status(400).send("Erro Occured " + err));



});

app.post('/sendMail', function(req, res) {
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
        res.send(info);
    });
})



async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: details.email,
            pass: details.password
        }
    });
    let imgsrc = 'https://blog.sagipl.com/wp-content/uploads/2018/03/Online-eCommerce-Store.gif'

    let mailOptions = {
        from: '"myKart"<example.gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Welcome To India's Biggest Marketplace - myKart 🎁 ", // Subject line
        html: `<h3><strong>Hello ${user.name} ,</strong></h3><br><br> <h3> <strong>We Welcome You To India's Biggest Marketplace - myKart. Get access to your Orders, Whistlists and Recommendations. </strong></h3><br><br><h3><span>Warm Regards ,</span><br><span>Team myKart</span></h3></h3><br><br><img src =${imgsrc}  width="950px"> `
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}
app.post('/forgotPassword', function(req, res) {
    customer.findAll({
        where: { email: req.body.email }
    }).then((data) => {
        let user = data;
        sendPassword(user, info => {
            console.log(`The mail has beed send 😃 and the id is ${info.messageId}`)
        });
        res.status(200).send(data)
    }).catch((err) => res.status(400).send("Error Occured " + err))

})

async function sendPassword(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: details.email,
            pass: details.password
        }
    });
    let imgsrc = 'https://blog.sagipl.com/wp-content/uploads/2018/03/Online-eCommerce-Store.gif'

    let mailOptions = {
        from: '"myKart"<example.gmail.com>', // sender address
        to: user[0].email, // list of receivers
        subject: "Your Credentials - myKart 🎁 ", // Subject line
        html: `<h3><strong>Hello ${user[0].name} ,</strong></h3><br><br> <h3> <strong>Please find your credentials below to login into your account and  get access to your Orders, Whistlists and Recommendations. </strong></h3><br><br><br><h3><span>Email : ${user[0].email}</span><br><span>Password : ${user[0].password}</span><br><br><span>Warm Regards ,</span><br><span>Team myKart</span></h3><img src =${imgsrc}  width="950px"> `
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);

}



app.post('/insertProductData', function(req, res) {
    const myProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,


    }
    product.create(myProduct)
        .then((data) => res.status(200).send("Record submitted successfully"))
        .catch(err => res.status(400).send("Erro Occured " + err));

})

app.post('/addToCart', async function(req, res) {
    const myProduct = {
        userid: req.body.userid,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,


    }



    cart.create(myProduct)
        .then((data) => res.status(200).send("Record submitted successfully"))
        .catch(err => res.status(400).send("Erro Occured " + err));

});
app.delete('/removeItemFromCart/:Id', async function(req, res) {

    cart.destroy({
        where: {
            id: Number(req.params.Id)
        }
    }).then(() => res.status(200).send("Record deleted successfully")).catch(err => res.status(400).send("Erro Occured " + err));

})





app.listen(3001, function(req, res) {
    console.log("Server is running at port 3001");
});