if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.exports = {
    DB_SOURCE : process.env.DB_SOURCE
}