require('dotenv').config();
const app = require("./index");
const http  = require("http");

const port = process.env.port || 3000;
// if(process.env.NODE_ENV == 'PRODUCTION'){
//     http.createServer(app).listen(3000)
// }
// else{
app.listen(port,()=>{
    try{
        console.log("Server stated on port : "+port);
    }catch(error){
        console.log("Server not started on port :" +port+"with error :"+error)
    }
});

