// FROM THE BASE METEOR PROJECT... DELETE!
// counter starts at 0
Session.setDefault('counter', 0);

Template.virus.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.virus.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});

//This is the Phaser game object
var game;
var teamColorsString = ['#377eb8','#4daf4a','#ff7f00','#984ea3'];
var teamColorsHex = [0x377eb8,0x4daf4a,0xff7f00,0x984ea3];
var game_active = false;


//This represents the state of the (201x201) game board: 0-empty, 1-virus, -1/-4 team 1-4 polygons
var board_state = [];
var CellStates = {
	EMPTY : 0,
	VIRUS : 1,
	TEAM1 : -1,
	TEAM2 : -2,
	TEAM3 : -3,
	TEAM4 : -4
}
var board_dim_x = 201;
var board_dim_y = 201;

//Initial virus board 

// -- these values seem to lead to stable virus
//var initial_virus_prob = 0.4;
//var virulence = 0.5;
//var resistance = 0.5;
//var range = 1;
// -- these values start small, double each turn and lead to complete invasion in 20 turns
var initial_virus_prob = 0.001;
var virulence = 0.99;
var resistance = 0.6;
var range = 2;

var turn = 0;
var turn_delay = 3000; //time in ms. to advance to the next turn -- for debugging purposes only
var num_virus_cells = 0;
//Game is over when LESS than this amount of cells are empty
var gameover_limit = 0.01*board_dim_x*board_dim_y;




window.onload = function() {

    //game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameboard', { preload: preload, create: create }, true);
    game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameboard', null, true);

    game.state.add('MainMenu',BattleshipGame.MainMenu);
    game.state.add('GameNewTurn',BattleshipGame.GameNewTurn);
    game.state.add('GameAnalysis',BattleshipGame.GameAnalysis);
    game.state.add('GameShoot',BattleshipGame.GameShoot);
    game.state.add('GameResolve',BattleshipGame.GameResolve);
//    game.state.add('GameWin',BattleshipGame.GameWin);
    game.state.add('GameOver',BattleshipGame.GameOver);

    game.state.start('MainMenu');


  //   function preload () {

  //       game.load.image('virus', 'virus.png');
  //       game.load.image('virus-big', 'virus-big.png');

  //   }

  //   function create () {

  //       board_state = initializeBoard(board_state);
  //       board_state = setBoardInitialState(board_state, initial_virus_prob);

  //       viruses = game.add.group();
		// viruses.enableBody = false;

  //       drawBoardState(board_state);
  //  	    Session.set('counter', num_virus_cells = countCells(board_state,CellStates.VIRUS));

  //       //  Create our Timer
	 //    timer = game.time.create(false);

	 //    //  Set a TimerEvent to occur after 3 seconds
	 //    timer.loop(turn_delay, nextTurn, this);

	 //    //  Start the timer running - this is important!
	 //    //  It won't start automatically, allowing you to hook it to button events and the like.
	 //    timer.start();

  //   }


};




//Creates the initial 201x201 board, empty (0)
function initializeBoard(board, dimensionx, dimensiony, whatwith){
	for(var x = 0; x < dimensionx; x++){
	    board[x] = [];    
	    for(var y = 0; y < dimensiony; y++){ 
	        board[x][y] = whatwith;    
	    }    
	}
	return board;
}

//Sets the initial distribution of virus on the board, using a uniform random variable of probability pvirus
function setBoardInitialState(board, whatwith, prob){
	for(var x = 0; x < board.length; x++){
	    for(var y = 0; y < board[0].length; y++){ 
	    	if(Math.random()<prob) board[x][y] = whatwith;    
	    }    
	}
	return board;
}

//Calculates the spread of a virus, in function of the previous state
//The probability that an empty space will become a virus is a function of the virus cells around (from 1-8)
//and a virulence multiplier
//The range parameter (by default, 1) determines how far do we look for virus cells to determine probability 
//of a new virus cell (for now, only 1 or 2 are supported)
function calculateVirusSpread(board, virulence, resistance, range, neutral, spreading){

	//The default range is 1, and we only support 2 as the other value
	range = typeof range !== 'undefined' ? range : 1;
	if(range!= 2) range=1;
	var max_adjacence = (Math.pow((range+2),2))-1;

	var new_board = [];
	new_board = initializeBoard(new_board, board_dim_x, board_dim_y, neutral);

	for(var x = 0; x < board.length; x++){
	    for(var y = 0; y < board[0].length; y++){ 
    		var adjacent_cells = getAdjacentVirusCells(x, y, board, range, spreading);
	    	
	    	//The probability of a virus cell dying away is (1-resistance)*(proportion of clean cells) 
	    	// so for virulence 1 there is 50% chance that a lone virus cell will die away
	    	if(board[x][y] == spreading){
	    		var prob = (1-resistance)*((max_adjacence-adjacent_cells)/max_adjacence);
	    		if(Math.random()<prob) new_board[x][y] = neutral;
	    		else new_board[x][y] = board[x][y];
	    	}else{
	    		//The probability of an empty cell being a virus is (proportion of adjacent virus cells)*virulence
	    		var prob = (adjacent_cells/max_adjacence)*virulence;
	    		if(Math.random()<prob) new_board[x][y] = spreading;
	    		else new_board[x][y] = board[x][y];
	    	}
	    }    
	}
	return new_board;
}

//Calculates how many cells adjacent to x,y are viruses, within a range of 1 or 2
function getAdjacentVirusCells(x, y, board, range, todetect){

	var adjacent_cells = 0;
	var initiali = -range;
	var finali = range;
	var initialj = -range;
	var finalj = range;

	var dimx = board.length;
	var dimy = board[0].length;

	//We check for the special cases of cells on the edges of the map
	if(x-range<0) initiali = -x;
	else if(x+range>dimx-1) finali = (dimx-1)-x;
	if(y-range<0) initialj = -y;
	else if(y+range>dimy-1) finalj = (dimy-1)-y;

	for (var i=initiali;i<=finali;i++){
		for(var j=initialj;j<=finalj;j++){
			if(i!=0 || j!=0){//We do not count the cell itself
				if(board[x+i][y+j]==todetect) adjacent_cells++;
			}
		}		
	}
	return adjacent_cells;
}



function darkenBoard(){

    //if (typeof graphics != 'undefined') graphics.clear(); 
    graphics = game.add.graphics();
    graphics.beginFill(0x000000, 0.5);
    graphics.lineStyle(1, 0x000000, 0);
    graphics.drawRect(0,0,game.world.width, game.world.height);
    graphics.endFill();
}


function drawBoardState(board){

	//if (typeof viruses != 'undefined') viruses.removeAll();
    var viruses = game.add.group();
	viruses.enableBody = false;

	for (var y = 0; y < board_dim_y; y++)
    {
        for (var x = 0; x < board_dim_x; x++)
        {
        	if(board[x][y]==CellStates.VIRUS){
	            var virus = viruses.create(x * 3, y * 3, 'virus');
	            virus.anchor.setTo(0.5, 0.5);
        	}
        }
    }


}


// function nextTurn() {
// 		console.log("Advancing from turn "+turn);
// 		turn++;
// 		board_state = calculateVirusSpread(board_state, virulence, resistance, range, CellStates.EMPTY, CellStates.VIRUS);
// 		drawBoardState(board_state);

// 		//We plot the moves of the different teams so far. Later, this should be separated
// 		drawTeamMoves(turn);
// 		//TODO: calculate intersection with virus, kill them, assign points...

// 	    Session.set('counter', num_virus_cells = countCells(board_state,CellStates.VIRUS));
// 		console.log("turn "+turn+" drawn");
// 		num_free_cells = countCells(board_state,CellStates.EMPTY);
// 		if(num_free_cells < gameover_limit) gameOver();

// }

function countCells(board, type){
	var counter=0;
	for (var y = 0; y < board_dim_y; y++)
    {
        for (var x = 0; x < board_dim_x; x++)
        {
        	if(board[x][y]==type) counter++;
        }
    }
    return counter;
}

// function gameOver(){

// 	timer.stop();
//     var baddie = game.add.sprite(game.world.centerX, game.world.centerY-50, 'virus-big');
//     baddie.anchor.setTo(0.5, 0.5);
//     var text = game.add.text(game.world.centerX, game.world.centerY+50, 'Game over!', { font: '64px Arial', fill: '#300' , align: 'center'});
//     text.anchor.set(0.5);

// }

function drawTeamMoves(this_turn){

	//We look for the collection of moves so far, for each team
	for (var team = 1; team <= 4; team++ ){
		var teamMoves = Moves.find({activity_id: 1, team: team, turn: { $lte: this_turn }}).fetch();	

		console.log("Drawing team "+team+" moves. Found "+teamMoves.length);

		for(var i = 0; i < teamMoves.length; i++){

			drawMove(teamMoves[i], teamColorsHex[team-1], 0x000000);
			//We only draw the origin of the move in the last one
            if(i==teamMoves.length-1) drawOrigin(teamMoves[i], teamColorsHex[team-1], 0x000000);
		}

	}

	console.log("Finished drawing moves!")
}

function drawOrigin(move, fillcolor, linecolor){
    var radius_origin = 5;//radius in pixels of the origin marker

    var graphics = game.add.graphics();
    graphics.beginFill(fillcolor);
    graphics.lineStyle(2, linecolor, 1);

    //We calculate the origin of the polygon to draw (with the translation parameter), in game coordinates (-1,1)
    var newOrigin = [(move.origin)[0]+(move.translation)[0],(move.origin)[1]+(move.translation)[1]];
    //We paint a circle with the new origin point
    graphics.drawCircle((transformCoordToWorld(newOrigin))[0],(transformCoordToWorld(newOrigin))[1], radius_origin);

}


//Draws a team move (basically, a polygon, using the fill color and line color specified)
function drawMove(move, fillcolor, linecolor){

    var graphics = game.add.graphics();

    graphics.beginFill(fillcolor);
    graphics.lineStyle(1, linecolor, 1);

    //We calculate the origin of the polygon to draw (with the translation parameter), in game coordinates (-1,1)
    var newOrigin = [(move.origin)[0]+(move.translation)[0],(move.origin)[1]+(move.translation)[1]];
    //Transform (rotate the polygon vertices), still in game coordinates
    var newPolygon = rotatePoints(move.polygon, move.rotation);


    //We draw the polygon
    graphics.moveTo((transformCoordToWorld(newOrigin))[0],(transformCoordToWorld(newOrigin))[1]);
    for (var i = 0; i < newPolygon.length; i++){
        var vertex = newPolygon[i];//The vertex, rotated but centered on 0,0
        graphics.lineTo((transformCoordToWorld(arraySum(vertex,newOrigin)))[0], (transformCoordToWorld(arraySum(vertex,newOrigin)))[1]);
    } 
    //We return to the first vertex, to close the polygon
    graphics.lineTo((transformCoordToWorld(arraySum(newPolygon[0],newOrigin)))[0], (transformCoordToWorld(arraySum(newPolygon[0],newOrigin)))[1]);
    graphics.endFill();


}

//Transform from the game xy coordinates (-1...1,-1...1) (in a 2d array)
// to pixels in the canvas (0...600,0...600) in another array - which starts in the top-left corner
function transformCoordToWorld(coords){

	var worldCoords = [0,0];

	//Basic linear transformation
	worldCoords[0] = Math.round((coords[0]+1)*300);
	worldCoords[1] = Math.round(600-(coords[1]+1)*300);

	return worldCoords;
}


//Rotates a set of xy points around the origin, for a number of degrees, clockwise
function rotatePoints(arrayCoords, degrees){
	var newArrayCoords = [];
	for (var i = 0; i < arrayCoords.length; i++){
		var vertex = arrayCoords[i];
		//we transform the angle to negative, since the formulas suppose counterclockwise rotation
		var newCoords = [(vertex[0] * Math.cos(toRadians(-degrees))) - (vertex[1] * Math.sin(toRadians(-degrees))),
			(vertex[1] * Math.cos(toRadians(-degrees))) + (vertex[0] * Math.sin(toRadians(-degrees)))];
		newArrayCoords.push(newCoords);
	}

	return newArrayCoords;
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

//Does a vector sum (component by component) of numeric arrays. 
//The output is an array with the same dimension as the smallest of the two arrays
function arraySum(array1 , array2){
    var sum = [];
    var dimension = Math.min(array1.length, array2.length);
    for (var i = 0; i < dimension; i++){
        sum.push(array1[i]+array2[i]);
    }
    return sum;
}


//Battleship game states
//TODO: Move to different files for legibility

//Object that will hold all the game states
BattleshipGame = {};

//Main menu, when the game is started up and after each game
BattleshipGame.MainMenu = function(){
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	//Maybe add some variables relevant for this state
}; 
 
BattleshipGame.MainMenu.prototype = { 
    preload : function(){ 
        this.load.image('virus-big', 'virus-big.png');
    }, 
 
    create : function(){ 
 
	    var baddie = this.add.sprite(this.world.centerX, this.world.centerY-50, 'virus-big');
	    baddie.anchor.setTo(0.5, 0.5);
	    var text = this.add.text(this.world.centerX, this.world.centerY+50, 
	    	'Save the body from \nthe spreading virus!\nPress "N" to create a new game' , 
	    	{ font: '36px Arial', fill: '#300' , align: 'center'});
	    text.anchor.set(0.5);

	    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startGame, this);

    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startGame : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameNewTurn');
    }
};



//New turn, in which the virus spread is calculated and shown, 
// and the game over is triggered if virus spread too far
BattleshipGame.GameNewTurn = function(){
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	//Maybe add some variables relevant for this state
}; 
 
BattleshipGame.GameNewTurn.prototype = { 
    preload : function(){ 
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 

	 	turn++;
 
	 	//If it's a new game, initialization of the game board and other variables
	 	if(!game_active){

		    board_state = initializeBoard(board_state, board_dim_x, board_dim_y, CellStates.EMPTY);
		    board_state = setBoardInitialState(board_state, CellStates.VIRUS, initial_virus_prob);

	 		game_active = true;
	 	}else{//We calculate the virus spread

			board_state = calculateVirusSpread(board_state, virulence, resistance, range, CellStates.EMPTY, CellStates.VIRUS);

	 	}

	    drawBoardState(board_state);

	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

	 	Session.set('counter', num_virus_cells = countCells(board_state,CellStates.VIRUS));

		console.log("New turn "+turn+" drawn");

		//We check the losing condition for game over
		num_free_cells = countCells(board_state,CellStates.EMPTY);
		if(num_free_cells < gameover_limit) this.gameOver();

		//We paint the New turn message
	    var text = this.add.text(this.world.centerX, this.world.centerY, 
	    	'Turn '+turn , 
	    	{ font: '36px Arial', fill: '#300' , align: 'center'});
	    text.anchor.set(0.5);

	 	//We add the key listener to pass to the next phase
	    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startAnalysis, this);

    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startAnalysis : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameAnalysis');
    },

    gameOver : function(){
    	this.input.keyboard.clearCaptures();
    	this.state.start('GameOver');
    }
};



//Analysis phase, in which the board is darkened and students have time to calculate their next move
BattleshipGame.GameAnalysis = function(){
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	//Maybe add some variables relevant for this state
}; 
 
BattleshipGame.GameAnalysis.prototype = { 
    preload : function(){ 

    }, 
 
    create : function(){ 

	    drawBoardState(board_state);

	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

	    darkenBoard();
		console.log("Analysis turn "+turn+" drawn");
		//We paint the New turn message
	    var text = this.add.text(this.world.centerX, this.world.centerY, 
	    	'Turn '+turn+'\nAnalysis phase' , 
	    	{ font: '36px Arial', fill: '#000' , align: 'center'});
	    text.anchor.set(0.5);

	 	//We add the key listener to pass to the next phase
	    keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startShoot, this);

    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startShoot : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameShoot');
    },

};





//Shooting phase, in which the teams execute the rotation/translation
// (probably, refreshing it in realtime in the team stats?)
BattleshipGame.GameShoot = function(){
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	//Maybe add some variables relevant for this state
}; 
 
BattleshipGame.GameShoot.prototype = { 
    preload : function(){ 

    }, 
 
    create : function(){ 

	    drawBoardState(board_state);

   	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

	    darkenBoard();

		console.log("Shooting turn "+turn+" drawn");
		//We paint the New turn message
	    var text = this.add.text(this.world.centerX, this.world.centerY, 
	    	'Turn '+turn+'\nShooting phase' , 
	    	{ font: '36px Arial', fill: '#000' , align: 'center'});
	    text.anchor.set(0.5);

	 	//We add the key listener to pass to the next phase
	    keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startResolve, this);

    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startResolve : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameResolve');
    },

};





//Shoot resolution phase, in which the shoots are displayed, 
// and resulting viruses killed and points calculated
BattleshipGame.GameResolve = function(){
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	//Maybe add some variables relevant for this state
}; 
 
BattleshipGame.GameResolve.prototype = { 
    preload : function(){ 

    }, 
 
    create : function(){ 
	    drawBoardState(board_state);

    	//We get the moves from the database, and paint them
		drawTeamMoves(turn);

		//TODO: check for the collisions with polygons, and kill the viruses and add points

		console.log("Resolve turn "+turn+" drawn");

		//TODO: check for the winning conditions

	 	//We add the key listener to pass to the next phase
	    keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startNext, this);

    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startNext : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameNewTurn');
    },

};

 
