const express = require("express");
const bodyParser = require("body-parser");
const db = require("./model")
const serverConfig = require("./config/server.config")

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//testing api

app.get('/', (req, res)=>{
    res.send({
        "message" : "Hello World"
    });
})

require("./route/auth.routes")(app);
app.listen(serverConfig.PORT, () =>{
    console.log(`Server is listeing on PORT ${serverConfig.PORT}`);
})