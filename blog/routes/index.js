
/*
 * GET home page.
 */

//render all classes
exports.index = function(req, res){
  res.render('index', {
    contentPartial : 'classes',
    classname: false,
    week:false,
    assignment:false
  });
};

//render all weeks of a class
exports.class = function(req, res){
  res.render('index', {
    contentPartial :'class_index',
    classname: req.params.class,
    week: false,
    assignment: false
  });
};

//render a specific week
exports.week = function(req, res){
  res.render('index', {
    contentPartial :'class_'+req.params.class+'_'+req.params.week,
    classname: req.params.class,
    week: req.params.week,
    assignment: false
  });
};

//render a specific assignment 
exports.assignment = function(req, res){
  res.render('index', {
    contentPartial :'assign_'+req.params.class+'_'+req.params.week+'_'+req.params.assignment,
    classname: req.params.class,
    week: req.params.week ,
    assignment: req.params.assignment
  });
};
