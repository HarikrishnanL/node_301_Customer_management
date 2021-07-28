const jwt = require("jsonwebtoken");

exports.sign = (payload,secret,options=null)=>{
    try{
        let encode = jwt.sign({payload:payload},secret,options);
        return encode;
    }catch(err){
        throw new Error("Internal Server Error");
    }
}

exports.decode = (verifyToken,secret)=>{
    try{
        let decode = jwt.verify(verifyToken,secret);
        return decode.payload;
    }catch(err){
        throw new Error("Internal Server Error");
    }
}