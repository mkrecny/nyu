var Automata = function(){

  this.resolution = 75;
  this.state = null;
  this.state_b = null;
  this.n_hood_size = 9;
  this.dynamism = 0.209;
  this.speed = 30;
  this.world = null;
  this.ctx = null;
  this.law = {};

  this.init = function(outcomes, div_id){
    var self = this;
    this.world = document.getElementById(div_id);
    this.ctx = this.world.getContext('2d');
    //this.dynamism = this.getDynamism();

    this.fillStyleA = this.getRandomColor(); 
    this.fillStyleB = this.getRandomColor();;

    if (!outcomes){
      window.location.pathname = '/'+this.getOutcomes();
    } else {
      //this.law = law ? law : this.generateLaw(this.dynamism, this.n_hood_size);
      this.law = this.getLawMapFromOutcomes(outcomes); 
      this.state = this.createState(this.resolution);
      this.state_b = this.createState(this.resolution);
      this.state = this.populateState(this.state);
      this.run(this.state, this.state_b, this.law);
    }
  };

  this.getRandomColor = function(){
    var colors = [];
    var getStyleString = function(r, g, b){
      var str = 'rgb(';
      return str+r.toString()+','+g.toString()+','+b.toString()+')';
    };
    for (var i = 0 ; i < 3 ; i++){
      colors.push(Math.ceil(Math.random()*255));
    }
    return getStyleString(colors[0], colors[1], colors[2]);
  };

  this.getDynamism = function(){
    //return num btwn 0.21 and 0.29
    return 0.21+((Math.random()*8)/100);
  };

  this.getOutcomes = function(){
    var outcomes = '';
    var num_antecedents = Math.pow(2, this.n_hood_size);
    for (var i = 0; i< num_antecedents; i++) {
      outcomes+= (Math.random() < this.dynamism ? 1 : 0).toString();
    }
    return outcomes;
  };

  this.getLawMapFromOutcomes = function(outcomes){
    var map = {};
    var antecedents = this.generateAntecedents('', this.n_hood_size, []);
    for (var i=0 ; i<antecedents.length; i++){
      map[antecedents[i]] = outcomes.charAt(i)/1;
    }
    return map;
  };

  this.run = function(oldState, newState, law){
    var self = this;
    this.renderState(oldState, this.world, this.resolution);
    newState = this.writeNewState(oldState, newState, law);
    setTimeout(function(){
      self.run(newState, oldState, law);
    }, self.speed);
  };

  this.writeNewState = function(oldState, newState, law){
    var size = oldState.length;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var antecedent = this.getAntecedent(oldState, i, j);
        newState[i][j] = law[antecedent];
      }
    }
    return newState;
  };

  this.getAntecedent = function(state, i, j){
    var max_index = state.length-1;
    var antecedent = '';
    for (var k = -1 ; k < 2 ; k++) {
      for (var l = -1 ; l < 2 ; l++) {
        var _i = (i+k < 0 || i+k > max_index) ? (i+k < 0 ? max_index : 0) : i+k;  
        var _j = (j+l < 0 || j+l > max_index) ? (j+l < 0 ? max_index : 0) : j+l;  
        antecedent += state[_i][_j];
      }
    }
    return antecedent;
  };

  this.generateLaw = function(dynamism, nHoodSize) {
    var map = {};  
    var antecedents = this.generateAntecedents('', nHoodSize, []);
    antecedents.forEach(function(a){
      map[a] = Math.random() < dynamism ? 1 : 0;
    });
    return map; 
  };

  this.generateAntecedents =  function(stem, size, cont){
    var self = this;
    if (size === 0) {
      return cont.push(stem);
    }
    for (var s = 0; s < 2; s++){ 
      var growth = stem+s.toString();
      self.generateAntecedents(stem+s.toString(), size-1, cont);
    } 
    return cont;
  };

  this.createState = function(resolution){
    var state = new Array(resolution);
    for (var i = 0 ; i < resolution ; i++) {
      state[i] = new Array(resolution);
    }
    return state;
  };

  this.populateState = function(state, frequency){
    var size = state.length;
    for (var i = 0; i < size; i++) {
      for (var j = 0 ; j < size; j++) {
        //state[i][j] = Math.random()<frequency ? 1 : 0;  
        state[i][j] = 0;
      }
    }
    var middle = Math.floor(size/2);
    state[middle][middle] = 1;
    return state;
  };

  this.renderState = function(state, world, resolution){
    var self = this;
    this.ctx.clearRect(0, 0, this.world.width, this.world.height);
    var html = '';
    var size = state.length;
    var unit_x = this.world.width/resolution;
    var unit_y = this.world.height/resolution;

    for (var i = 0; i < size; i++){
      for (var j = 0; j < size; j++){
        if (state[i][j]){
          //this.ctx.fillStyle = this.fillStyleA;
          this.ctx.fillStyle = "rgb(255,255,255)";
          self.ctx.fillRect(unit_x*j, unit_y*i, unit_x, unit_y);
        } else {
          //this.ctx.fillStyle = this.fillStyleB;
          this.ctx.fillStyle = "rgb(0,0,0)";
          self.ctx.fillRect(unit_x*j, unit_y*i, unit_x, unit_y);
        }
      }
    }
  };
};
