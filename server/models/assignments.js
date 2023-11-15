let mongoose = require('mongoose');

let assignmentsModel = mongoose.Schema({
    Name:String,
    Description:String,
    DueDate:String
},
{
    collection:"assignments"
});

module.exports = mongoose.model('assignments', assignmentsModel);