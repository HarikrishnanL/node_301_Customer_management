const jwt = require("jsonwebtoken");

exports.sign = (payload,secret,options=null)=>{
    try{
        let encode = jwt.sign({payload:payload},secret,options);
        return encode;
    }catch(error){
        // error change
        throw error
        
        
    }
}

exports.decode = (verifyToken,secret)=>{
    try{
        let decode = jwt.verify(verifyToken,secret);
        if(decode.payload){
            return decode.payload;
        }else{
            throw new Error("JWT access token got expired")
        }
       
    }catch(error){
        throw error;
    }
}