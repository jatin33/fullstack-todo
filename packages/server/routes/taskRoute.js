const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

// Get all tasks present in todos
router.get('/', function(req, res, next) {
    Task.find((err,result)=>{
        if(!err){
            res.send({status:'success', error: false, data: result});
        }else{
            res.send({status:'failure', error:true});
        }
    });
});

// Add task in todo collection
router.post('/', function(req,res,next) {
    const { body } = req;
    const task = new Task({text: body.name});
    task.save((err,result) => {
        if(!err){
            res.send({status:'success', error:false, message:result});
        }else{
            res.send({status:'failure', error:true});
        }
    });
});

// Update task in todo collection
router.put('/:taskId', function(req,res,next){
    Task.findByIdAndUpdate(req.params.taskId, {text: req.body.text}, (err,result)=>{
        if(!err){
            res.send({status:'success', error:false, message:result});
        }else{
            res.send({status:'failure', error:true});
        }
    });
});

// Deletes task in todo collection
router.delete('/:taskId', function(req,res,next){
    Task.findByIdAndRemove(req.params.taskId,(err,result)=>{
        if(!err){
            res.send({status:'success', error:false, message:result});
        }else{
            res.send({status:'failure', error:true});
        }
    });
});

module.exports = router;
