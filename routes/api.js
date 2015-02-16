var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/taskManager');

var express = require('express');

var router = express.Router();

mongoose.model('task',{completed: false, title: String})

router
  .get('/', function(req, res, next) {
    res.status(200).end();
  })
  .delete('/todos', function(req, res, next) {
    mongoose.model('task').find({completed:true}).remove()
    res.status(200).end();
  })
  .get('/todos', function(req, res, next) {
    mongoose.model('task').find(function(err,tasks){
      res.send(tasks);  
    })
  })
  .post('/todos', function(req, res, next) {
    mongoose.model('task').create(req.body, function (err, task) {
      res.send(task);
    });
  })
  .put('/todos/:id', function(req, res, next) {
    mongoose.model('task').findOneAndUpdate({_id:req.params.id}, req.body, function (err, task) {
      res.send(task);
    });
  })
  .delete('/todos/:id', function(req, res, next) {
    mongoose.model('task').remove({_id:req.params.id},function(err, task) {
      if(err) {
        throw Error();
        res.status(500).end();
      }
      res.status(200).end();
    });  
  })

module.exports = router;
