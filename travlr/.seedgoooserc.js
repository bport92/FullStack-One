//.seedgooserc.js

module.exports = {
    monduleBaseDirectory: "app_server/database/models", //model directory name

    models: ["*.js", "!db.js"], //models matcher

    data: "data", //data directory name
    
    db: "mongodb://127.0.0.1:27017travlr", //db connection url"
};