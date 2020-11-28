const express = require('express');
const path = require('path');
const cors = require('cors');
const body_parser = require("body-parser");
const database = require('./database');
const { send } = require('process');

require('dotenv').config();
let apiResponse = {
    success: false,
    error:'',
    result:[]
}
// initiate the express app
const app = express();

// parse JSON (application/json content-type)
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true}));

// use cors for cross origin problems
app.use(cors());


app.get('/', (req, res) => res.send('Home Route'));

const port = process.env.PORT || 8080;

// run server
app.listen(port, () => console.log(`Server is running on ${port}, http://localhost:${port}`));


//run database
database.initialize('reisetopia', 'hotels', function(dbCollection) { // successCallback
    // << db CRUD routes >>
    app.get('/hotels', (req, res) => {
        // Get All documents
        dbCollection.find().toArray((error, result) => {
            if (error) {
                apiResponse.error = error;
            };
            apiResponse.success = true;
            if (req.query.search){
                // get matched Documents
                const searchTerm = req.query.search;
                const newResult = result.filter((hotel) => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()));
                apiResponse.result = newResult;
                res.json(apiResponse);
            }else{
                apiResponse.result = result;
                res.json(apiResponse);
            }
        });
    });

    // create Document
    app.post("/items", (request, response) => {
        const item = request.body;
        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            response.json("item Added!");
        });
    });

    //update Document
    app.put("/items/:name", (request, response) => {
        const itemName = request.params.name;
        const item = request.body;
        console.log("Editing item: ", itemName, " to be ", item);

        dbCollection.updateOne({ name: itemName }, { $set: item }, (error, result) => {
            if (error) throw error;
            response.json("item Updated!");
        });
    });

    // delete Document
    app.delete("/items/:id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete item with id: ", itemId);

        dbCollection.deleteOne({ id: itemId }, function(error, result) {
            if (error) throw error;
            response.json("item deleted!");
        });
    });


}, function(err) { // failureCallback
    throw (err);
});