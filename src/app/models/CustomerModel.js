const Sequelize = require("sequelize");
const db = require("../config/database");
const customerStatus = require("../domain/enumerations/customerStatus");

const CustomerModel = db.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name :{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phoneNumber:{
        type:Sequelize.STRING,
        allowNull:false
    },
    token:{
        type:Sequelize.TEXT,
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:customerStatus.Active
    },
    role:{
        type:Sequelize.STRING,
        defaultValue:null
    }
    
},{
    freezeTableName:true
});

module.exports = CustomerModel;