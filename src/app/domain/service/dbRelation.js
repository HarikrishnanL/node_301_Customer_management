const CustomerModel = require("../../models/CustomerModel");
const db = require("../../config/database");

const dbRelation = (req, res, next) => {
    
    db
        // .sync({ force: true })
        .sync()
        .then(result=>{
            console.log("All tables created =========>");
        }).catch(error=>{
            console.log("Tables creating failed",error);
        });
    next();    
};
// needed rework
module.exports = dbRelation;