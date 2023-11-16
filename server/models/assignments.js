let mongoose = require('mongoose');

let assignmentsModel = mongoose.Schema({
    Name:String,
    Description:String,
    DueDate:String
    //the schema of the database
},
{
    collection:"assignments"
    //this is the collection from mongoDB
});

module.exports = mongoose.model('assignments', assignmentsModel);