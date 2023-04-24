const { Database } = require("./database");
const myDatabase = new Database("database name", __dirname + "/database.json");

myDatabase.setScheme({
    nestedKey1: {
        type: "string",
        required: true
    }
})