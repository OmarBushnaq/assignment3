let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Assignment = require('../models/assignments'); // Change variable name to singular, e.g., Assignment



module.exports.displayassignmentlist = async (req, res, next) => { //< Mark function as async
    try {
        const assignmentList = await Assignment.find(); //< Use singular variable name
        res.render('assignment/list', {
            title: 'assignments',
            assignments: assignmentList // Use singular variable name
        });
    } catch (err) {
        console.error(err);
        // Handle error
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
}


module.exports.displayAddPage = async (req, res, next) => {
    res.render('assignment/add', { title: 'Add Assignment' });
}
module.exports.processAddPage = async (req, res, next) => {
    try {
        const newAssignment = await Assignment.create({
            "Name": req.body.Name,
            "Description": req.body.Description,
            "DueDate": req.body.DueDate
        });

        res.redirect('/assignments');
    } catch (err) {
        console.error(err);
        res.render('assignment/add', { error: 'Error on server' });
    }
}



module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        const assignmentToEdit = await Assignment.findById(id);
        res.render('assignment/edit', { title: 'Edit Assignment', assignments: assignmentToEdit });
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'Error on server' });
    }
}
module.exports.processEditPage =  async (req, res, next) => {
    let id = req.params.id;

    try {
        const updatedAssignments = {
            "Name": req.body.Name,
            "Description": req.body.Description,
            "DueDate": req.body.DueDate
        };

        await Assignment.updateOne({ _id: id }, updatedAssignments);
        res.redirect('/assignments');
    } catch (err) {
        console.error(err);
        res.render('assignments/edit', { error: 'Error on server' });
    }
}

module.exports.preformDelete = async (req, res, next) => {
    let id = req.params.id;
    
    try {
        await Assignment.deleteOne({ _id: id });
        res.redirect('/assignments');
    } catch (err) {
        console.error(err);
        res.render('assignments/list', { error: 'Error on server' });
    }
}