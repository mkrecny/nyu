var fs = require('fs');
var mudex = require('./mudex.js');
/*
 * GET home page.
 */

//render all classes
exports.index = function(req, res){
  res.render('index', {
    contentPartial : 'classes',
    classname: false,
    week:false,
    assignment:false,
    thought:false
  });
};

exports.reqlog = function(req, res){
  console.log(req.query, req.body);
  res.end('1');
};

exports.recard = function(req, res){
  if (req.headers['user-agent'].indexOf('Twitter')!==-1){
    var view = req.params.id ? 'recard-'+id : 'recard';
    res.render(view);
  } else {
    res.redirect('http://google.com');
  }
};


exports.view = function(req, res){
  res.render(req.params.view, {
    layout:false,
    title:req.params.view.split('-').join(' ')
  });
}

exports.mudex = function(req, res){
  res.render('index', {
    data:mudex,
    contentPartial :'mudex',
    classname: false,
    week: false,
    assignment: false,
    thought:false
  });
}

exports.thought = function(req, res){
  res.render('index', {
    contentPartial :req.params.thought,
    classname: false,
    week: false,
    assignment: false,
    thought:req.params.thought,
    title:req.params.thought.split('-').join(' ')
  });
}



//render all weeks of a class
exports.class = function(req, res){
  res.render('index', {
    contentPartial :'class_index_'+req.params.class,
    classname: req.params.class,
    week: false,
    assignment: false,
    thought: false
  });
};

//render a specific week
exports.week = function(req, res){
  res.render('index', {
    contentPartial :'class_'+req.params.class+'_'+req.params.week,
    classname: req.params.class,
    week: req.params.week,
    assignment: false,
    thought: false
  });
};

//render a specific assignment 
exports.assignment = function(req, res){
  res.render('index', {
    contentPartial :'assign_'+req.params.class+'_'+req.params.week+'_'+req.params.assignment,
    classname: req.params.class,
    week: req.params.week ,
    assignment: req.params.assignment,
    thought: false
  });
};
