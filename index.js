const Express = require('express')
const BodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose();

//create an express instance / object
const express = new Express();
express.use(BodyParser.json())


//create a root handler
function rootHandler(request, response) {
    response.json({ "test": "ok" })
}


//listen for connection
express.listen(3000, 'localhost', function () {
    console.log("Server running on localhost at port 3000")
})

function createUser(request, response) {
    //parse the request body, doesn't need parser in express
    const name = request.body.name;
    const password = request.body.password;
    console.log(name, password);

    const db = new sqlite3.Database('storage.db')
    db.run("CREATE TABLE users(name TEXT, password TEXT")
    db.run(`INSERT INTO users (name)values(?)`, [name], function (err) {
        if (err) {
            response.json({ "Error": "true" })

        }
        response.json({ "Status": "Resource created" })

    })

    //get user name and password
    //insert user name and password to sqlite
    //once the operation is sucessful , send the sucess message

    response.json({ "status": "user-created" })
}

function getUser(request, response) {
    const db = new sqlite3.Database('storage.db')
    db.all("SELECT name from user", (error, result) => {
        console.log(result, error);
        response.json({ users: result })

    })
}

//mount the handler to the route
express.get('/ok', rootHandler)

//route name must be noun
express.post('/user', createUser)

express.get('/user', getUser())
