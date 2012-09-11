
/*
 * GET home page.
 */

//render all classes
exports.index = function(req, res){
  res.render('index', {
    contentPartial : 'classes',
    classname: false,
    week:false
  });
};

//render all weeks of a class
exports.class = function(req, res){
  res.render('index', {
    contentPartial :'class_index',
    classname: req.params.class,
    week: false
  });
};

//render a specific week
exports.week = function(req, res){
  res.render('index', {
    contentPartial :'class_'+req.params.class+'_'+req.params.week,
    classname: req.params.class,
    week: req.params.week 
  });
};
