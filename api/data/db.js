var mongoose = require("mongoose");
var dbUrl = "mongodb://localhost:27017/meantest";

mongoose.connect(dbUrl);
mongoose.connection.on("connected",function () {
    console.log("Connected to mongodb");
});
mongoose.connection.on("disconnected",function () {
    console.log("mongodb is disconnected");
});
mongoose.connection.on("error",function () {
    console.log("Error in Connecting to mongodb");
});
process.on("SIGINT",function(){
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});
process.on("SIGTERM",function(){
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});
// process.on("SIGUSR2",function(){
//     mongoose.connection.close(function () {
//         console.log("Mongoose disconnected through app termination");
//         process.kill(process.id,"SIGUSR2");
//     });
// });

require("./hotel-model.js");
require("./Usermodel.js");