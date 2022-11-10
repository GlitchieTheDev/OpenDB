const fs = require("fs")

function readDB(dbNAME) {
    let _db = fs.readFileSync(dbNAME)
    if (_db) {
        _db = JSON.parse(_db)

        return _db
    } else {
        return false
    }
}

function saveDB(data, dbNAME) {
    if (data) {
        data = JSON.stringify(data, null, 4)
        fs.writeFileSync(dbNAME, data)
    } else {
        throw "NO DATA PROVIDED TO SAVE"
    }
}

class Database {
    constructor (name, dbNAME) {
        if (name && dbNAME) {
            this.name = name
            this.dbNAME = dbNAME
            let data = readDB(this.dbNAME)
            this.primary_data = data
            this.data = this.primary_data[this.name]

            if (data) {
                if (!data[this.name]) {
                    data[this.name] = []
                    saveDB(data,this.dbNAME)
                }

                this.items = data[this.name].length
            }
        } else {
            throw "ERROR FIND CONDITIONS NOT DEFINED"
        }
    }

    createItem(key, value) {
        let db = readDB(this.dbNAME)
        let data = { key, value }

        if (db) {
            // we're good to go
            db[this.name].push(data)
            saveDB(db,this.dbNAME)
        } else {
            // an error occured while reading the database
            throw "ERROR READING DATABASE"
        }
        
        this.items = db[this.name].length
        this.primary_data = db
        this.data = this.primary_data[this.name]
    }

    getItem(key) {
        let db = readDB(this.dbNAME)
        let result = null

        if (db) {
            // we're good to go
            if (key) {
                for (let i = 0; i < db[this.name].length; i++) {
                    if (db[this.name][i].key === key) {
                        result = db[this.name][i].value
                    }

                    if (i === db[this.name].length && result === null) {
                        throw "PROVIDED KEY DOES NOT EXIST"
                    }
                }
            } else {
                throw "NO KEY DEFINED TO PICK UP"
            }
        } else {
            // an error occured while reading the database
            throw "ERROR READING DATABASE"
        }

        return result
    }

    setItem(key, value) {
        let db = readDB(this.dbNAME)
        let oldData = this.getItem(key)

        if (db && oldData) {
            // we're good to go

            db[this.name].forEach(e => {
                if (e.key === key) {
                    e.value = value
                }
            });
            
            saveDB(db,this.dbNAME)
        } else {
            // an error occured while reading the database
            throw "ERROR READING DATABASE"
        }
    }

    findItem(c) {
        let db = readDB(this.dbNAME)
        let tdb = db[this.name]
        let result = []

        if (c === undefined || c === null) {
            throw "ERROR FIND CONDITIONS NOT DEFINED"
        }

        let findConditions = Object.keys(c)
        

        for (let j = 0; j <= (tdb.length - 1); j++) {
            // console.log(tdb[j], j)
            // for (let i = 0; i <= Object.keys(tdb[j]["value"]).length; i++) {
                for (let x = 0; x <= (findConditions.length - 1); x++) {
                    let val = Object.keys(tdb[j]["value"])
                    // console.log(val[x], c[findConditions[x]])
                    // console.log(c, findConditions, x)
                    // format: { key: n, value: o }
                    // console.log(tdb[j]["key"])
                    let rVal = this.getItem(tdb[j]["key"])

                    if (rVal[findConditions[x]] === c[findConditions[x]]) {
                        let f = {
                            key: tdb[j]["key"],
                            value: rVal
                        }

                        result.push(f)
                    }

                    // let f = {
                    //     key: tdb[j]["key"],
                    //     value: this.getItem(tdb[j]["key"])
                    // }
                    // result.push(this.getItem(tdb[j]["key"]), tdb[j]["key"])
                    // result.push(f)
                }
            // }
        }

        return result
    }

    deleteItem(key) {
        let db = readDB(this.dbNAME)
        let result = null

        if (db) {
            if (key) {
                // we're good to go
                for (let i = 0; i < db[this.name].length; i++) {
                    if (db[this.name][i].key === key) {
                        result = db[this.name][i].value
                        db[this.name].splice(i,1)
                        saveDB(db,this.dbNAME)
                    }

                    if (i === db[this.name].length && result === null) {
                        throw "PROVIDED KEY DOES NOT EXIST"
                    }
                }
            } else {
                throw "NO KEY DEFINED TO PICK UP"
            }
        } else {
            // an error occured while reading the database
            throw "ERROR READING DATABASE"
        }
        
        this.items = db[this.name].length
        this.primary_data = db
        this.data = this.primary_data[this.name]

        // return result
    }
}

const results = { Database }

module.exports = results