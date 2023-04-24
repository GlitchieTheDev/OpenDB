const { Database } = require("./database");
const myDatabase = new Database("database name", __dirname + "/database.json");

require("./model") //  load the scheme

// myDatabase.createItem("key1", {
//     nestedKey1: "nestedValue1"
// });

// let res = myDatabase.findItem({
//     nestedKey1: "nestedValue1"
// })

// console.log(res)

// myDatabase.deleteItem("key1")

// let res = myDatabase.getItem("key1");
// console.log(res)

myDatabase.createItem(Math.random(), {
    // nestedKey1: 1.242,
    nestedKey1: "null"
})
