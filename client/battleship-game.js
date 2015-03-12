// FROM THE BASE METEOR PROJECT... DELETE!
// counter starts at 0
Session.setDefault('virus_counter', 0);
Session.setDefault('proportion_counter', 0);

Template.virus.helpers({
  showBlock: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only hide the block in the main menu phase
        if(typeof activity_server === 'undefined') return false;
        if(activity_server.current_state.phase=='MainMenu' || activity_server.current_state.phase==null) return false;
        else return true;
  }
});

Template.virus.helpers({
  counter: function () {
    return Session.get('virus_counter');
  }
});

Template.virus.helpers({
  proportion: function () {
    return Session.get('proportion_counter').toFixed(3);
  }
});

//Helpers of the team 1 data
Template.team1.helpers({
  showBlock: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only hide the block in the main menu phase
        if(typeof activity_server === 'undefined') return false;
        if(activity_server.current_state.phase=='MainMenu' || activity_server.current_state.phase==null) return false;
        else return true;
  }
});


Template.team1.helpers({
    team1_points: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
         if(typeof activity_server === 'undefined') return 0;
       return activity_server.current_state.team1_points;
    }
});

Template.team1.helpers({
    translation: function () {
        var shoot = (CurrentShoots.find("1").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return [shoot.translation[0].toFixed(3),shoot.translation[1].toFixed(3)];
    }
});

Template.team1.helpers({
    rotation: function () {
        var shoot = (CurrentShoots.find("1").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return shoot.rotation;
    }
});



Template.team1.helpers({
    showMove: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only show the moves in the shooting and resolving phases
        if(typeof activity_server === 'undefined') return false;
        if((activity_server.current_state.phase=='GameShoot')||(activity_server.current_state.phase=='GameResolve')) return true;
        else return false;
    }
});

//Helpers of the team 2 data
Template.team2.helpers({
  showBlock: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only hide the block in the main menu phase
        if(typeof activity_server === 'undefined') return false;
        if(activity_server.current_state.phase=='MainMenu' || activity_server.current_state.phase==null) return false;
        else return true;
  }
});

Template.team2.helpers({
    team2_points: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        if(typeof activity_server === 'undefined') return 0;
        return activity_server.current_state.team2_points;
    }
});

Template.team2.helpers({
    translation: function () {
        var shoot = (CurrentShoots.find("2").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return [shoot.translation[0].toFixed(3),shoot.translation[1].toFixed(3)];
    }
});

Template.team2.helpers({
    rotation: function () {
        var shoot = (CurrentShoots.find("2").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return shoot.rotation;
    }
});


Template.team2.helpers({
    showMove: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only show the moves in the shooting and resolving phases
        if(typeof activity_server === 'undefined') return false;
        if((activity_server.current_state.phase=='GameShoot')||(activity_server.current_state.phase=='GameResolve')) return true;
        else return false;
    }
});


//Helpers of the team 3 data
Template.team3.helpers({
  showBlock: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only hide the block in the main menu phase
        if(typeof activity_server === 'undefined') return false;
        if(activity_server.current_state.phase=='MainMenu' || activity_server.current_state.phase==null) return false;
        else return true;
  }
});

Template.team3.helpers({
    team3_points: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        if(typeof activity_server === 'undefined') return 0;
        return activity_server.current_state.team3_points;
    }
});

Template.team3.helpers({
    translation: function () {
        var shoot = (CurrentShoots.find("3").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return [shoot.translation[0].toFixed(3),shoot.translation[1].toFixed(3)];
    }
});

Template.team3.helpers({
    rotation: function () {
        var shoot = (CurrentShoots.find("3").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return shoot.rotation;
    }
});


Template.team3.helpers({
    showMove: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only show the moves in the shooting and resolving phases
        if(typeof activity_server === 'undefined') return false;
        if((activity_server.current_state.phase=='GameShoot')||(activity_server.current_state.phase=='GameResolve')) return true;
        else return false;
    }
});


//Helpers of the team 4 data
Template.team4.helpers({
  showBlock: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only hide the block in the main menu phase
        if(typeof activity_server === 'undefined') return false;
        if(activity_server.current_state.phase=='MainMenu' || activity_server.current_state.phase==null) return false;
        else return true;
  }
});

Template.team4.helpers({
    team4_points: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        if(typeof activity_server === 'undefined') return 0;
        return activity_server.current_state.team4_points;
    }
});

Template.team4.helpers({
    translation: function () {
        var shoot = (CurrentShoots.find("4").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return [shoot.translation[0].toFixed(3),shoot.translation[1].toFixed(3)];
    }
});

Template.team4.helpers({
    rotation: function () {
        var shoot = (CurrentShoots.find("4").fetch())[0];
        if(typeof shoot === 'undefined') return [0,0];
        return shoot.rotation;
    }
});


Template.team4.helpers({
    showMove: function () {
        var activity_server = (Activities.find({ id : 1 }).fetch())[0];
        //We only show the moves in the shooting and resolving phases
        if(typeof activity_server === 'undefined') return false;
        if((activity_server.current_state.phase=='GameShoot')||(activity_server.current_state.phase=='GameResolve')) return true;
        else return false;
    }
});


//TODO: Solve bug for which some board states are left null!!


//This is the Phaser game object
var game;
var teamColorsHex = [0x377eb8,0x4daf4a,0xff7f00,0x984ea3];
//Darker and brighter variants of the colors, for nicer tessellations
var teamColorsVariants = [];

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

var starting_positions = [[-1.0, 1.0], [1.0, 1.0], [1.0, -1.0], [-1.0, -1.0]]; //Where in the board each team starts

//Initial virus board 

// -- these values seem to lead to stable virus
//var initial_virus_prob = 0.4;
//var virulence = 0.5;
//var resistance = 0.5;
//var range = 1;
// -- these values start small, double each turn and lead to complete invasion in 20 turns
var initial_virus_prob = 0.01;
var virulence = 0.9;
var resistance = 0.05;
var range = 2;

var turn = 0;
var turn_delay = 3000; //time in ms. to advance to the next turn -- for debugging purposes only
var num_virus_cells = 0;
//Game is over when proportion of virus to cells is X to 1
var gameover_limit = 10;
var winning_limit = 0;
var illegal_overlap_tolerance = 100; //in overlapping cells
var proportion_virus = 0;
var this_move_points = [0,0,0,0];//This holds the points achieved by each team this turn


window.onload = function() {

    //We initialize the team color variants
    for(var i=0; i<4; i++){
        var teamcolorString = parseColor(teamColorsHex[i]);
        var variants = [parseColor(ColorLuminance(teamcolorString, -0.2), true),parseColor(ColorLuminance(teamcolorString, -0.1), true),teamColorsHex[i],parseColor(ColorLuminance(teamcolorString, 0.1), true),parseColor(ColorLuminance(teamcolorString, 0.2), true)];
        teamColorsVariants.push(variants);
    }



    //game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameboard', { preload: preload, create: create }, true);
    game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameboard', null, true);

    game.state.add('MainMenu',BattleshipGame.MainMenu);
    game.state.add('GameNewTurn',BattleshipGame.GameNewTurn);
    game.state.add('GameAnalysis',BattleshipGame.GameAnalysis);
    game.state.add('GameShoot',BattleshipGame.GameShoot);
    game.state.add('GameResolve',BattleshipGame.GameResolve);
    game.state.add('GameWin',BattleshipGame.GameWin);
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
	    	//TFor now, team cells cannot be eaten away by virus
	    	//The probability of a virus cell dying away is (1-resistance)*(proportion of clean cells) 
	    	// so for virulence 1 there is 50% chance that a lone virus cell will die away
	    	if(board[x][y] == spreading){
	    		var prob = (1-resistance)*((max_adjacence-adjacent_cells)/max_adjacence);
	    		if(Math.random()<prob) new_board[x][y] = neutral;
	    		else new_board[x][y] = board[x][y];
	    	}else if(board[x][y] == neutral){
	    		//The probability of an empty cell being a virus is (proportion of adjacent virus cells)*virulence
	    		var prob = (adjacent_cells/max_adjacence)*virulence;
	    		if(Math.random()<prob) new_board[x][y] = spreading;
	    		else new_board[x][y] = board[x][y];
	    	}else{//If it is a team cell, we just leave it as it is
                new_board[x][y] = board[x][y];
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

    var colors = game.add.graphics();
    colors.lineStyle(0, 0x000000, 0);//transparent borders

	for (var y = 0; y < board_dim_y; y++)
    {
        for (var x = 0; x < board_dim_x; x++)
        {
        	if(board[x][y]==CellStates.VIRUS){
	            var virus = viruses.create(x * 3, y * 3, 'virus');
	            virus.anchor.setTo(0.5, 0.5);
        	} 
        	//We paint only the viruses - the team plays will be painted as polygons
        	/*else if(board[x][y]==CellStates.TEAM1){
                colors.beginFill(teamColorsHex[0]);
                colors.drawRect((x * 3)-2, (y * 3)-2, 4, 4);//TODO: For now the squares are side=4, although should be 3? this is to have them be centered
            }else if(board[x][y]==CellStates.TEAM2){
                colors.beginFill(teamColorsHex[1]);
                colors.drawRect((x * 3)-2, (y * 3)-2, 4, 4);//TODO: For now the squares are side=4, although should be 3? this is to have them be centered
            }else if(board[x][y]==CellStates.TEAM3){
                colors.beginFill(teamColorsHex[2]);
                colors.drawRect((x * 3)-2, (y * 3)-2, 4, 4);//TODO: For now the squares are side=4, although should be 3? this is to have them be centered
            }else if(board[x][y]==CellStates.TEAM4){
                colors.beginFill(teamColorsHex[3]);
                colors.drawRect((x * 3)-2, (y * 3)-2, 4, 4);//TODO: For now the squares are side=4, although should be 3? this is to have them be centered
            }*/
        }
    }
    colors.endFill();


}

//This function draws the grid and labels, to have a visual frame of reference
function drawGrid(){
	var graphs = game.add.graphics();
    
    //Main axes
    graphs.lineStyle(1, 0x000000, 1);
    graphs.moveTo(0,game.world.height / 2);
    graphs.lineTo(game.world.width,game.world.height / 2);
    graphs.moveTo(game.world.width / 2, 0);
    graphs.lineTo(game.world.width / 2, game.world.height);

    //basic grid every 0.1, from 0.1 to 0.9
    graphs.lineStyle(1, 0x000000, 0.2);
    for (var i=0.1; i<=0.9; i+=0.1){
    	//positive 0.1s
	    graphs.moveTo(0,game.world.height*(0.5+i/2));
	    graphs.lineTo(game.world.width,game.world.height*(0.5+i/2));
	    graphs.moveTo(game.world.width*(0.5+i/2), 0);
	    graphs.lineTo(game.world.width*(0.5+i/2), game.world.height);

	    //negative 0.1s
	    graphs.moveTo(0,game.world.height*(0.5-i/2));
	    graphs.lineTo(game.world.width,game.world.height*(0.5-i/2));
	    graphs.moveTo(game.world.width*(0.5-i/2), 0);
	    graphs.lineTo(game.world.width*(0.5-i/2), game.world.height);
    }

    //labels
    var text = game.add.text(game.world.centerX, game.world.centerY, ' (0,0)', { font: '16px Arial', fill: '#000' , align: 'left'});
    text.anchor.set(0,0.8);
    var text2 = game.add.text(0, 0, ' (-1,1)', { font: '16px Arial', fill: '#000' , align: 'left'});
    text2.anchor.set(0,0);
    var text3 = game.add.text(game.world.width, 0, '(1,1) ', { font: '16px Arial', fill: '#000' , align: 'right'});
    text3.anchor.set(1,0);
    var text4 = game.add.text(game.world.width, game.world.height, '(1,-1) ', { font: '16px Arial', fill: '#000' , align: 'right'});
    text4.anchor.set(1,1);
    var text5 = game.add.text(0, game.world.height, ' (1,-1)', { font: '16px Arial', fill: '#000' , align: 'left'});
    text5.anchor.set(0,1);

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


//check for the collisions with polygons, and kill the viruses and add points
function calculateTeamMoves(board, this_turn){

    this_move_points = [0,0,0,0];//The score that each team is getting from the last (current) move

    //We look for the collection of moves so far, for each team
    for (var team = 1; team <= 4; team++ ){
        var teamMoves = Moves.find({activity_id: 1, team: team, turn: { $lte: this_turn }}).fetch();    

        console.log("Calculating team "+team+" move. Found "+teamMoves.length);

        //We get the last move 
        if(teamMoves.length != this_turn){
            console.log("Something strange happened. There are less (or more) moves than turns!");
            return board;
        }else{
            //TODO: check for overlapping polygons in this turn 
            //-- bounding box of all polygons, check points for inclusion in more than one polygon
            //-- or check segment intersections for all sides of all polygons
            var result = calculateMove(board, teamMoves[this_turn - 1]);
            if(!result){
                console.log("Illegal move by team "+team);
                var illMove = Moves.find({activity_id: 1, team: team, turn: this_turn }).fetch();    
               //We update this move to say it was illegal
               Moves.update(illMove[0]._id, {$set: {illegal : true}});
            }else{
                board = result;
            }
        }
    }

    console.log("Finished Calculating moves!");
    return board;
}

//get the corresponding cell state to the team 1...4
function getTeamCellState(team){
    if(team==1) return CellStates.TEAM1;
    else if(team==2) return CellStates.TEAM2;
    else if(team==3) return CellStates.TEAM3;
    else if(team==4) return CellStates.TEAM4;
    else return CellStates.EMPTY;//should not happen, actually
}

//This function calculates whether a polygon overlaps with viruses, and kills them 
//and mark the territory of this team
//returns a false saying whether the movement was valid (false), or the new board after this move
function calculateMove(board, move){
    //If we have no polygon, we calculate no move! return the same board
    if(move.polygon.length==0) return board;

    //We calculate this moves' polygon, in game coordinates (-1...1)
    //We calculate the origin of the polygon to draw (with the translation parameter), in game coordinates (-1,1)
    var newOrigin = [(move.origin)[0]+(move.translation)[0],(move.origin)[1]+(move.translation)[1]];
    //Transform (rotate the polygon vertices), still in game coordinates
    var rotatedPolygon = rotatePoints(move.polygon, move.rotation);
    var newPolygon = [];//This will contain the final translated-rotated polygon
    for (var i = 0; i < rotatedPolygon.length; i++){
        var vertex = rotatedPolygon[i];//The vertex, rotated but centered on 0,0
        newPolygon.push([(arraySum(vertex,newOrigin))[0], (arraySum(vertex,newOrigin))[1]]);
    }

    //We get the x and y coordinates of the bounding rectangle of the polygon (in matrix dimensions, i.e. 0...200)
    var boundingbox = PolyK.GetAABB(flattenCoords(newPolygon));
    var min_bounding_x = boundingbox.x;
    var min_bounding_y = boundingbox.y;
    var max_bounding_x = boundingbox.x+boundingbox.width;
    var max_bounding_y = boundingbox.y+boundingbox.height;


    //We transform the bounding box to a (slightly larger) set of x,y 
    //indices in the state board matrix 0...200
    var min_bounding_x_index = (Math.round((min_bounding_x+1)*100))-1 < 0 ? 0 : (Math.round((min_bounding_x+1)*100))-1;
    var min_bounding_y_index = (Math.round((1-max_bounding_y)*100))-1 < 0 ? 0 : (Math.round((1-max_bounding_y)*100))-1;//Since the y axis in world and screen/matrix coordinates are opposite, we take the max
    var max_bounding_x_index = (Math.round((max_bounding_x+1)*100))+1 > board.length-1 ? board.length-1 : (Math.round((max_bounding_x+1)*100))+1;
    var max_bounding_y_index = (Math.round((1-min_bounding_y)*100))+1 > board[0].length-1 ? board[0].length-1 : (Math.round((1-min_bounding_y)*100))+1;

    var boundingmatrix = [];
    var illegals = 0;
    //For each point in the bounding rectangle, we calculate whether it is inside the polygon
    for(var i = 0; i<=max_bounding_x_index-min_bounding_x_index; i++){
        boundingmatrix[i] = [];
        for(var j = 0; j<=max_bounding_y_index-min_bounding_y_index; j++){
            //we get the point to which this matrix element corresponds in the map
            var coords = transformMatrixToCoords(i+min_bounding_x_index,j+min_bounding_y_index);
            //we check whether the point is in the polygon
            if(PolyK.ContainsPoint ( flattenCoords(newPolygon), coords[0], coords[1] ) ){
                //If a point is in the polygon, we check what it contains, and act accordingly 
                //(virus to destroy, illegal movements into others' territory)
                if(board[i+min_bounding_x_index][j+min_bounding_y_index]==CellStates.VIRUS){
                    console.log("Killed a virus at "+(i+min_bounding_x_index)+","+(j+min_bounding_y_index)+"!");
                    this_move_points[move.team-1] +=10;
                    boundingmatrix[i][j] = getTeamCellState(move.team); 
                }//TODO: How to deal with "almost ok solutions"?? 
                //even perfect matching will throw some illegal results
                //for now, we allow a certain number of illegal cells and only declare it illegal if surpasses
                else if(board[i+min_bounding_x_index][j+min_bounding_y_index]==CellStates.EMPTY){
                    boundingmatrix[i][j] = getTeamCellState(move.team); 
                }
                else{//The remaining states are from teams, not allowed! 
                    //we declare an invalid move and leave the cell as it was
                    console.log("detected illegal move!");
	                boundingmatrix[i][j] = board[i+min_bounding_x_index][j+min_bounding_y_index];                
                    illegals++;
                }

            }else{
                //If a point is not in the polygon, we just copy from the board state
                boundingmatrix[i][j] = board[i+min_bounding_x_index][j+min_bounding_y_index];                
            }




        }

    }

    if(illegals>illegal_overlap_tolerance) return false;

    //We copy the results of this new bounding rectangle states back into the original board state
    for(var i = 0; i<=max_bounding_x_index-min_bounding_x_index; i++){
        for(var j = 0; j<=max_bounding_y_index-min_bounding_y_index; j++){
            board[i+min_bounding_x_index][j+min_bounding_y_index] = boundingmatrix[i][j];
        }
    }


    //We return the new board
    return board;

}


//Takes the two indices in the board matrix (0...200) and transforms them 
//to a geometrical point at its center in the game coordinate system
function transformMatrixToCoords(i,j){

    var coords = [0,0];
    coords[0] = (i/100)-1;
    coords[1] = 1-(j/100);
    return coords;
}



//takes an array of arrays (dim x*2) and converts it to an uni-dimensional array, as needed by PolyK library
function flattenCoords(polygon){
    var newArray = [];
    for(var i = 0 ; i < polygon.length ; i++){
        var vertex = polygon[i];
        newArray.push(vertex[0]);
        newArray.push(vertex[1]);
    }
    return newArray;
}


function drawTeamMoves(this_turn){

	//We look for the collection of moves so far, for each team
	for (var team = 1; team <= 4; team++ ){
		var teamMoves = Moves.find({activity_id: 1, team: team, turn: { $lte: this_turn }}).fetch();	

		console.log("Drawing team "+team+" moves. Found "+teamMoves.length);

		for(var i = 0; i < teamMoves.length; i++){

            if(!teamMoves[i].illegal || i==teamMoves.length-1) drawMove(teamMoves[i], teamColorsVariants[team-1][i%5], 0x000000);
            if(i==teamMoves.length-1){
                drawOrigin(teamMoves[i], teamColorsVariants[team-1][0], 0xDDDD00);  
            } 
		}

	}

	console.log("Finished drawing moves!");
}

function drawOrigin(move, fillcolor, linecolor){
    var radius_origin = 20;//radius in pixels of the origin marker

    var graphics = game.add.graphics();
    graphics.beginFill(fillcolor);
    graphics.lineStyle(4, linecolor, 1);

    //We calculate the origin of the polygon to draw (with the translation parameter), in game coordinates (-1,1)
    var newOrigin = [(move.origin)[0]+(move.translation)[0],(move.origin)[1]+(move.translation)[1]];
    //We paint a circle with the new origin point
    graphics.drawCircle((transformCoordToWorld(newOrigin))[0],(transformCoordToWorld(newOrigin))[1], radius_origin);

}


//Draws a team move (basically, a polygon, using the fill color and line color specified)
function drawMove(move, fillcolor, linecolor){

    //If we have no polygon, we draw no move! return the same board
    if(move.polygon.length==0) return board;


    var graphics = game.add.graphics();

    if(!move.illegal){//Coloring for legal moves, with the team color
        graphics.beginFill(fillcolor);
        graphics.lineStyle(1, linecolor, 1);
    }else{
        graphics.beginFill(0x000000, 0.2);
        graphics.lineStyle(3, 0xff0000, 1);
    }

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

        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);


	 	turn++;
 
	 	//If it's a new game, initialization of the game board and other variables
	 	if(!game_active){

            //We store the previous activity in the activities log
            logActivity(activity_server);
            logInitializeMoves();

            //We initialize the activity server with the current state
            Activities.update(activity_server._id, {$set: {
                                            type: 'battleship-collab',
                                            current_state: {
                                                active: false,
                                                turn: turn,
                                                phase: this.state.current,
                                                board: null,
                                                num_virus_cells: 0,
                                                team1_points: 0,
                                                team2_points: 0,
                                                team3_points: 0,
                                                team4_points: 0
                                                }
                                            }
                                        });


		    board_state = initializeBoard(board_state, board_dim_x, board_dim_y, CellStates.EMPTY);
		    board_state = setBoardInitialState(board_state, CellStates.VIRUS, initial_virus_prob);

	 		game_active = true;


	 	}else{//We calculate the virus spread

			board_state = calculateVirusSpread(board_state, virulence, resistance, range, CellStates.EMPTY, CellStates.VIRUS);

	 	}

	    drawBoardState(board_state);

	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

	 	Session.set('virus_counter', num_virus_cells = countCells(board_state,CellStates.VIRUS));
        //If this is the first turn, we set the winning condition, e.g. to half of the initial viruses
        if(turn == 1) winning_limit = Math.floor(num_virus_cells/2);

		console.log("New turn "+turn+" drawn");

		//We check the losing condition for game over
		num_free_cells = countCells(board_state,CellStates.EMPTY);
        if(num_free_cells == 0) this.gameOver();
		else{
            proportion_virus = num_virus_cells/num_free_cells;
            Session.set('proportion_counter', proportion_virus);
            if(proportion_virus > gameover_limit) this.gameOver();
        }


		drawGrid();


		//We paint the New turn message
	    var text = this.add.text(this.world.centerX, this.world.centerY, 
	    	'Turn '+turn , 
	    	{ font: '36px Arial', fill: '#300' , align: 'center'});
	    text.anchor.set(0.5);

	 	//We add the key listener to pass to the next phase
	    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startAnalysis, this);


        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: true,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: turn==1 ? 0 : activity_server.current_state.team1_points,
                                            team2_points: turn==1 ? 0 : activity_server.current_state.team2_points,
                                            team3_points: turn==1 ? 0 : activity_server.current_state.team3_points,
                                            team4_points: turn==1 ? 0 : activity_server.current_state.team4_points
                                            }
                                        }
                                    });

        //We reset the shooting values, to the same polygon and 0s trans/rot, just in case
        for(var i=1; i<=4; i++){
            var shoot = CurrentShoots.findOne(""+i);
            CurrentShoots.update(""+i, {$set: {
                    translation: [0.0,0.0],
                    polygon: shoot.polygon,
                    rotation: 0
                }
            });
        }


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


function logActivity(activity){
            var activityToLog = JSON.parse(JSON.stringify(activity));
            delete activityToLog._id;//So that an unique one is generated
            activityToLog.timestamp = new Date().getTime();
            ActivitiesLog.insert(activityToLog);
}

function logInitializeMoves(){

    var movelog = {};
    //We take the whole collection of moves
    movelog.moves = Moves.find().fetch();

    //We add a couple of fields more
    movelog.timestamp = new Date().getTime();

    //We insert it in the logs
    MovesLog.insert(movelog);
    //We delete the moves collection
    Meteor.call('removeAllMoves');
}


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
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 

        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);


	    drawBoardState(board_state);

	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

		drawGrid();

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


        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: true,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: activity_server.current_state.team1_points,
                                            team2_points: activity_server.current_state.team2_points,
                                            team3_points: activity_server.current_state.team3_points,
                                            team4_points: activity_server.current_state.team4_points
                                            }
                                        }
                                    });


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
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 

        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);

	    drawBoardState(board_state);

   	    //We draw the moves for the last turn
		drawTeamMoves(turn-1);

		drawGrid();

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

        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: true,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: activity_server.current_state.team1_points,
                                            team2_points: activity_server.current_state.team2_points,
                                            team3_points: activity_server.current_state.team3_points,
                                            team4_points: activity_server.current_state.team4_points
                                            }
                                        }
                                    });


    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startResolve : function(){

        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);


        //before we go to the next phase, we take the current shooting values of each team and create a new move with it (it will be resolved in the next phase)
        for(var i=1; i<=4; i++){
            var last_move;
            if(turn>1) last_move = Moves.findOne({ team: i, turn: turn-1 });
    
            var shoot = CurrentShoots.findOne(""+i);

            Moves.insert({
                 activity_id: activity_server.id,
                 turn: turn,
                 team: i,
                 origin: turn>1 ? [last_move.origin[0]+last_move.translation[0], last_move.origin[1]+last_move.translation[1]] : starting_positions[i-1],//Last origin + last translation
                 polygon: shoot.polygon,
                 rotation: shoot.rotation,
                 translation: shoot.translation,
                 illegal: false
             });


        }

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
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 

        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);

    	//We get the moves from the database, and paint them
        drawBoardState(board_state);

            
        //check for the collisions with polygons, and kill the viruses and add points
        board_state = calculateTeamMoves(board_state,turn);
        //only the latest move is actually displayed as a polygon
        //(the rest should come from board state)
        drawTeamMoves(turn);


		drawGrid();


		console.log("Resolve turn "+turn+" drawn");

        num_virus_cells = countCells(board_state,CellStates.VIRUS);
		if(Session.get('proportion_counter') < initial_virus_prob/2) this.startWin();

	 	//We add the key listener to pass to the next phase
	    keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
    	keyN.onDown.add(this.startNext, this);

        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: true,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: activity_server.current_state.team1_points+this_move_points[0],
                                            team2_points: activity_server.current_state.team2_points+this_move_points[1],
                                            team3_points: activity_server.current_state.team3_points+this_move_points[2],
                                            team4_points: activity_server.current_state.team4_points+this_move_points[3]
                                            }
                                        }
                                    });


    }, 
 
    update : function(){ 
 
	    // your game loop goes here 
    }, 

    startNext : function(){
    	this.input.keyboard.clearCaptures();
	    this.state.start('GameNewTurn');
    },

    startWin : function(){
        this.input.keyboard.clearCaptures();
        this.state.start('GameWin');
    }

};

 



//Game over phase, just shows a baddie and some text, 
// and resulting viruses killed and points calculated
BattleshipGame.GameOver = function(){
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
 
BattleshipGame.GameOver.prototype = { 
    preload : function(){ 
        this.load.image('virus-big', 'virus-big.png');
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 
        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);

        drawBoardState(board_state);

        //We get the moves from the database, and paint them
        drawTeamMoves(turn);


		drawGrid();


         var baddie = game.add.sprite(game.world.centerX, game.world.centerY-50, 'virus-big');
         baddie.anchor.setTo(0.5, 0.5);
         var text = game.add.text(game.world.centerX, game.world.centerY+50, 'Game over!', { font: '64px Arial', fill: '#300' , align: 'center'});
         text.anchor.set(0.5);

        console.log("Game Over turn "+turn+" drawn");

        //We add the key listener to pass to the next phase
        keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
        keyN.onDown.add(this.startMenu, this);

        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: false,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: activity_server.current_state.team1_points,
                                            team2_points: activity_server.current_state.team2_points,
                                            team3_points: activity_server.current_state.team3_points,
                                            team4_points: activity_server.current_state.team4_points
                                            }
                                        }
                                    });


    }, 
 
    update : function(){ 
 
        // your game loop goes here 
    }, 

    startMenu : function(){
        this.input.keyboard.clearCaptures();
        this.state.start('MainMenu');
    },

};



//Game win phase, just shows a baddie crossed out and some text, 
// and resulting viruses killed and points calculated
BattleshipGame.GameWin = function(){
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
 
BattleshipGame.GameWin.prototype = { 
    preload : function(){ 
        this.load.image('virus-big', 'virus-big.png');
         this.load.image('virus', 'virus.png');
    }, 
 
    create : function(){ 
        //We get the activity state from the classroom server
        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);

        drawBoardState(board_state);

        //We get the moves from the database, and paint them
        drawTeamMoves(turn);


		drawGrid();


         var baddie = game.add.sprite(game.world.centerX, game.world.centerY-50, 'virus-big');
         baddie.anchor.setTo(0.5, 0.5);
         var cross = game.add.text(game.world.centerX, game.world.centerY-50, 'X', { font: '120px Arial', fill: '#300' , align: 'center'});
         cross.anchor.set(0.5);
         var text = game.add.text(game.world.centerX, game.world.centerY+50, 'Well done!\nThe virus has been contained!\nPress "N" to go back home', { font: '64px Arial', fill: '#300' , align: 'center'});
         text.anchor.set(0.5);

        console.log("Game Win turn "+turn+" drawn");

        //We add the key listener to pass to the next phase
        keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
        keyN.onDown.add(this.startMenu, this);

        var activity_server = ((Activities.find({ id : 1 }).fetch())[0]);
        logActivity(activity_server);

        //We update the activity server with the current state
        Activities.update(activity_server._id, {$set: {
                                        type: 'battleship-collab',
                                        current_state: {
                                            active: false,
                                            turn: turn,
                                            phase: this.state.current,
                                            board: board_state,
                                            num_virus_cells: num_virus_cells,
                                            team1_points: activity_server.current_state.team1_points,
                                            team2_points: activity_server.current_state.team2_points,
                                            team3_points: activity_server.current_state.team3_points,
                                            team4_points: activity_server.current_state.team4_points
                                            }
                                        }
                                    });


    }, 
 
    update : function(){ 
 
        // your game loop goes here 
    }, 

    startMenu : function(){
        this.input.keyboard.clearCaptures();
        this.state.start('MainMenu');
    },

};


//Helper function to vary the color's luminance for tessellations
function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

//Converts between hex and strings for colors
function parseColor(color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      //make sure our hexadecimal number is padded out
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
    }

    return color;
  }
};