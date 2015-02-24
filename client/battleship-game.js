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

//This represents the state of the (201x201) game board: 0-empty, 1-virus, -1/-4 team 1-4 polygons
var board_state = [];
var States = {
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
var initial_virus_prob = 0.003;
var virulence = 0.99;
var resistance = 0.6;
var range = 2;

var turn = 0;
var timer;
var turn_delay = 3000; //time in ms. to advance to the next turn -- for debugging purposes only
var num_virus_cells = 0;
//Game is over when LESS than this amount of cells are empty
var gameover_limit = 0.01*201*201;

//Creates the initial 201x201 board, empty (0)
function initializeBoard(board){
	for(var x = 0; x < board_dim_x; x++){
	    board[x] = [];    
	    for(var y = 0; y < board_dim_y; y++){ 
	        board[x][y] = States.EMPTY;    
	    }    
	}
	return board;
}

//Sets the initial distribution of virus on the board, using a uniform random variable of probability pvirus
function setBoardInitialState(board, pvirus){
	for(var x = 0; x < board_dim_x; x++){
	    for(var y = 0; y < board_dim_y; y++){ 
	    	if(Math.random()<pvirus) board[x][y] = States.VIRUS;    
	    }    
	}
	return board;
}

//Calculates the spread of a virus, in function of the previous state
//The probability that an empty space will become a virus is a function of the virus cells around (from 1-8)
//and a virulence multiplier
//The range parameter (by default, 1) determines how far do we look for virus cells to determine probability 
//of a new virus cell (for now, only 1 or 2 are supported)
function calculateVirusSpread(board, virulence, resistance, range){

	//The default range is 1, and we only support 2 as the other value
	range = typeof range !== 'undefined' ? range : 1;
	if(range!= 2) range=1;
	var max_adjacence = (Math.pow((range+2),2))-1;

	var new_board = [];
	new_board = initializeBoard(new_board);

	for(var x = 0; x < board_dim_x; x++){
	    for(var y = 0; y < board_dim_y; y++){ 
    		var adjacent_cells = getAdjacentVirusCells(x, y, board, range);
	    	
	    	if((board[x][y] == States.EMPTY)||
	    		(board[x][y] == States.TEAM1)||
	    		(board[x][y] == States.TEAM2)||
	    		(board[x][y] == States.TEAM3)||
	    		(board[x][y] == States.TEAM4)){
	    		
	    		var prob = (adjacent_cells/max_adjacence)*virulence;//The probability of an empty cell being a virus is (proportion of adjacent virus cells)*virulence
	    		if(Math.random()<prob) new_board[x][y] = States.VIRUS;
	    		else new_board[x][y] = board[x][y];
	    	}
	    	//The probability of a virus cell dying away is (1-resistance)*(proportion of clean cells) 
	    	// so for virulence 1 there is 50% chance that a lone virus cell will die away
	    	else if(board[x][y] == States.VIRUS){
	    		var prob = (1-resistance)*((max_adjacence-adjacent_cells)/max_adjacence);
	    		if(Math.random()<prob) new_board[x][y] = States.EMPTY;
	    		else new_board[x][y] = board[x][y];
	    	}
	    }    
	}
	return new_board;
}

//Calculates how many cells adjacent to x,y are viruses, within a range of 1 or 2
function getAdjacentVirusCells(x, y, board, range){

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
				if(board[x+i][y+j]==States.VIRUS) adjacent_cells++;
			}
		}		
	}
	return adjacent_cells;
}


var viruses;




function drawBoardState(board){

	viruses.removeAll();

	for (var y = 0; y < board_dim_y; y++)
    {
        for (var x = 0; x < board_dim_x; x++)
        {
        	if(board[x][y]==States.VIRUS){
	            var virus = viruses.create(x * 3, y * 3, 'virus');
	            virus.anchor.setTo(0.5, 0.5);
        	}
        }
    }


}



window.onload = function() {

    game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameboard', { preload: preload, create: create }, true);

    function preload () {

        game.load.image('virus', 'virus.png');
        game.load.image('virus-big', 'virus-big.png');

    }

    function create () {

        board_state = initializeBoard(board_state);
        board_state = setBoardInitialState(board_state, initial_virus_prob);

        viruses = game.add.group();
		viruses.enableBody = false;

        drawBoardState(board_state);
   	    Session.set('counter', num_virus_cells = countCells(board_state,States.VIRUS));

        //  Create our Timer
	    timer = game.time.create(false);

	    //  Set a TimerEvent to occur after 3 seconds
	    timer.loop(turn_delay, nextState, this);

	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();

    }


};

function nextState() {
		console.log("Advancing from turn "+turn);
		turn++;
		board_state = calculateVirusSpread(board_state, virulence, resistance, range);
		drawBoardState(board_state);
	    Session.set('counter', num_virus_cells = countCells(board_state,States.VIRUS));
		console.log("turn "+turn+" drawn");
		num_free_cells = countCells(board_state,States.EMPTY);
		if(num_free_cells < gameover_limit) gameOver();
}

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

function gameOver(){

	timer.stop();
    var baddie = game.add.sprite(game.world.centerX, game.world.centerY-50, 'virus-big');
    baddie.anchor.setTo(0.5, 0.5);
    var text = game.add.text(game.world.centerX, game.world.centerY+50, 'Game over!', { font: '64px Arial', fill: '#300' , align: 'center'});
    text.anchor.set(0.5);

}