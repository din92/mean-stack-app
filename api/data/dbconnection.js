var dbcon = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/meanhotel"
var _connection = null;

var open = function(){
dbcon.connect(dbUrl,function(err,db) {
    if(err)
    {
        console.log("Database connection failed");
        return;
    }
    _connection = db;
});
}

var get = function()
{
    return _connection;

}
module.exports= {
    open:open,
    get:get
}

