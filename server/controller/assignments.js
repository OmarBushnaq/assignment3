let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Assignment = require('../models/assignments'); 



module.exports.displayassignmentlist = async (req, res, next) => { //use async for updated mongoose
    try {
        const assignmentList = await Assignment.find(); 
        res.render('assignment/list', {
            title: 'assignments',
            assignments: assignmentList 
        });
    } catch (err) {
        console.error(err);
        // Handls error
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
}


module.exports.displayAddPage = async (req, res, next) => {
    res.render('assignment/add', { title: 'Add Assignment' });
}//renders the add page
module.exports.processAddPage = async (req, res, next) => {
    try {
        const newAssignment = await Assignment.create({//uses await because of updated mongoose
            "Name": req.body.Name,
            "Description": req.body.Description,
            "DueDate": req.body.DueDate
        });

        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        //handles the rror
        console.error(err);
        res.render('assignment/add', { error:'There is an error on server' });
    }
}



module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        const assignmentToEdit = await Assignment.findById(id);
        res.render('assignment/edit', { title: 'Edit Assignment', assignments: assignmentToEdit });
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'there is an error on server' });
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

        await Assignment.updateOne({ _id:id}, updatedAssignments);//updates using id
        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignments/edit', { error: 'there is an error on server' });
    }
}

module.exports.preformDelete = async (req, res, next) => {
    let id = req.params.id;
    
    try {
        await Assignment.deleteOne({ _id: id });//does the delete
        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignments/list', { error: 'there is an error on server' });
    }
}