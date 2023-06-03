const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const sequelize = new Sequelize("impeller", "root", "", {
    dialect: "mssql",
    host: "localhost"
})

module.exports = sequelize;
