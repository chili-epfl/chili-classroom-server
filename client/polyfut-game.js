//LOGIC FOR THE ACTUAL GAME
Template.team1.helpers({
    team1_points: function () {
       return Session.get('team1_points');
    }
});

Template.team2.helpers({
    team2_points: function () {
       return Session.get('team2_points');
    }
});

Template.team3.helpers({
    team3_points: function () {
       return Session.get('team3_points');
    }
});

Template.team4.helpers({
    team4_points: function () {
       return Session.get('team4_points');
    }
});


//We load the demo animation when its template is rendered
Template.Home.rendered = function() {
	$(document).keypress(function(e) {
	  if(e.which == 78 || e.which == 110) {
	    // N pressed
	    window.location.href = "/new";
  		}
	});
}



//We load the demo animation when its template is rendered
Template.game.rendered = function() {

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer', 
       null, true);

    game.global = {
    	doRTShoot: true,
    	shootRefreshTimestamp: 0,
    	but: false,
    	teambut: 0
    };

//TODO: Move this to the actual shooting phase
    // game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.setImpactEvents(true);
    // game.physics.p2.restitution = 1;
    // game.physics.p2.applyDamping = false;
    // game.physics.p2.applyGravity = false;
    // game.physics.p2.applySpringForces = false;
    // game.physics.p2.onBeginContact.add(checkGoal,this);

	//Object that will hold all the game states
	var PolyfutGame = {};

	var teamColorsHex = [0x377eb8,0x4daf4a,0xff7f00,0x984ea3];

    var ballInitialX;//This turn's starting ball coordinates
    var ballInitialY;

    var initialvx;//This turn's starting speed/trajectory
    var initialvy;

    var turn=0; //Turn counter

    var polygon1coords;//This turn's polygon coordinates
    var polygon2coords;
    var polygon3coords;
    var polygon4coords;

    //TODO: add this turn's polygons or rotation

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
	    var text = game.add.text(game.world.centerX, game.world.centerY, ' (0,0)', { font: '14px Arial', fill: '#000' , align: 'left'});
	    text.anchor.set(0,0.8);
	    var text2 = game.add.text(0, 0, ' (-10,10)', { font: '14px Arial', fill: '#000' , align: 'left'});
	    text2.anchor.set(0,0);
	    var text3 = game.add.text(game.world.width, 0, '(10,10) ', { font: '14px Arial', fill: '#000' , align: 'right'});
	    text3.anchor.set(1,0);
	    var text4 = game.add.text(game.world.width, game.world.height, '(10,-10) ', { font: '14px Arial', fill: '#000' , align: 'right'});
	    text4.anchor.set(1,1);
	    var text5 = game.add.text(0, game.world.height, ' (-10,-10)', { font: '14px Arial', fill: '#000' , align: 'left'});
	    text5.anchor.set(0,1);
	    var text6 = game.add.text(game.world.width, game.world.centerY, 'x  ', { font: '18px Arial', fill: '#000' , align: 'right'});
	    text6.anchor.set(1,0.8);
	    var text7 = game.add.text(game.world.centerX, 0, ' y', { font: '18px Arial', fill: '#000' , align: 'left'});
	    text7.anchor.set(0,0);

          //We draw the goals in the four walls
          //TODO: adjust goals to be equal length!
          var goals = game.add.graphics(0,0);
          //team 4
          goals.lineStyle(10,teamColorsHex[3],1);
          goals.moveTo(0,game.world.height*0.25);
          goals.lineTo(0,game.world.height*0.75);
          //team 1
          goals.lineStyle(10,teamColorsHex[0],1);
          goals.moveTo(game.world.width*0.25,0);
          goals.lineTo(game.world.width*0.75,0);
          //team 2
          goals.lineStyle(10,teamColorsHex[1],1);
          goals.moveTo(game.world.width,game.world.height*0.25);
          goals.lineTo(game.world.width,game.world.height*0.75);
          //team 3
          goals.lineStyle(10,teamColorsHex[2],1);
          goals.moveTo(game.world.width*0.25,game.world.height);
          goals.lineTo(game.world.width*0.75,game.world.height);


	}


	//Main menu, when the game is started up and after each game
	PolyfutGame.Initial = function(){
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
	 
	PolyfutGame.Initial.prototype = { 
	    preload : function(){ 
		  //this.load.image('ball', 'ball.png');
	    }, 
	 
	    create : function(){ 

	    	//We initialize the game counters
	    	Session.set('team1_points', 0);
	    	Session.set('team2_points', 0);
	    	Session.set('team3_points', 0);
	    	Session.set('team4_points', 0);

	    	Meteor.call('removeAllMoves');

	    //Test: Draw the ball at 6,-6
		  //var ball = this.add.sprite(coordsToPixels(this.world.width,this.world.height,6,-6).x,coordsToPixels(this.world.width,this.world.height,6,-6).y,'ball');
		  //ball.anchor.setTo(0.5, 0.5);
		  
		  drawGrid();

		  //((Activities.find({ id : 1 }).fetch())[0]);

		    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	keyN.onDown.add(this.startGame, this);

	    }, 
	 
	    update : function(){ 
	 
		    // your game loop goes here 
	    }, 

	    startGame : function(){

	    	this.input.keyboard.clearCaptures();
		    this.state.start('NewTurn');
	    }
	};



	//New turn, where the ball is placed in one of the corners, 
	// along with the speed of the shoot
	PolyfutGame.NewTurn = function(){
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
		this.shootGraphics;
	}; 
	 
	PolyfutGame.NewTurn.prototype = { 
	    preload : function(){ 
		  this.load.image('ball', 'ball.png');
	    }, 
	 
	    create : function(){ 

	    	turn++;

	    	//Determine the initial coordinates and speed
		  ballInitialX = Math.random()>0.5?9:-9;
		  ballInitialY = Math.random()>0.5?9:-9;
		  var ball = this.add.sprite(coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).x,
		  	coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).y,
		  	'ball');
		  ball.anchor.setTo(0.5, 0.5);
		  
          initialvx = ballInitialX > 0 ? Math.floor(Math.random()*(-this.world.width/4)-50) : Math.floor(Math.random()*(this.world.width/4)+50);
          initialvy = ballInitialY > 0 ? Math.floor(Math.random()*(this.world.height/4)+50) : Math.floor(Math.random()*(-this.world.height/4)-50);

          var initialtraj = this.add.graphics(ball.x,ball.y);
          initialtraj.lineStyle(2, 0x999999, 1);
          initialtraj.lineTo(initialvx,initialvy);

          //We add the illegal move circle
		  var circlegraph = this.add.graphics(ball.x,ball.y);
		  circlegraph.lineStyle(1, 0x990000, 0.5);
		  circlegraph.drawCircle(0,0,7*this.world.width/20);


		  drawGrid();


	    var text = this.add.text(this.world.centerX, this.world.centerY, 
	    	'Tour '+turn , 
	    	{ font: '36px Arial', fill: '#300' , align: 'center'});
	    text.anchor.set(0.5);


		    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	keyN.onDown.add(this.startResolution, this);

	    	updateServerActivity(this.state.current,turn);

	    }, 
	 
	    update : function(){ 
	    	//If activated, we display the current shoot in almost real time
	    	if(game.global.doRTShoot){
		 		var timestamp = Date.now();
		 		var refreshRate = 2*1000;//2 seconds
		 		if(timestamp - game.global.shootRefreshTimestamp > refreshRate){
		 			game.global.shootRefreshTimestamp = timestamp;
		 			if(this.shootGraphics) this.shootGraphics.clear();
		 			//TODO: Display the currentshoot polygons, but more transparent
			        var shoots = CurrentShoots.find().fetch();
          			this.drawShoots(shoots, ballInitialX, ballInitialY);

		 		}
	    	}


	    }, 

	    drawShoots : function(moves, ballx, bally){
	    	if(moves.length>4){
	    		console.log("Error! We have more than 4 teams!");
	    		return;
	    	}
		    this.shootGraphics = this.add.graphics();
	    	// For each team
	    	for(var i = 0; i < moves.length; i++){
	    		var move = moves[i];

	    		//We draw the polygon origin circle
			    var radius_origin = 20;//radius in pixels of the origin marker
			    this.shootGraphics.beginFill(0x000000,0.5);
			    this.shootGraphics.lineStyle(4, 0x000000, 0.5);
			    var originPix = coordsToPixelsArray(this.world.width, this.world.width, (move.translation)[0],(move.translation)[1]);
			    this.shootGraphics.drawCircle(originPix[0], originPix[1], radius_origin);

			    //We draw the polygon itself, rotated/translated
			    //Transform (rotate the polygon vertices), in -10,10 scale from the original -1,1
			    if(move.polygon.length>0){//In case we have no polygon
				    var newPolygon = rotatePoints(move.polygon, move.rotation);

				    var isIllegalMove = isPolygonNearer(translatePoints(newPolygon,(move.translation)[0],(move.translation)[1]),ballx,bally,3.5);//
	   		        if(!isIllegalMove){
	   		        	this.shootGraphics.lineStyle(2, 0x000000, 0.5);	
				        this.shootGraphics.beginFill(teamColorsHex[move._id-1],0.5);
	   		        }else{
	   		        	this.shootGraphics.lineStyle(3, 0xff0000, 0.5);	
				        this.shootGraphics.beginFill(teamColorsHex[move._id-1],0.2);
	   		        }

				    //We draw the polygon
				    this.shootGraphics.moveTo(originPix[0],originPix[1]);
				    for (var j = 0; j < newPolygon.length; j++){
				        var vertex = newPolygon[j];//The vertex, rotated but centered on 0,0 with scale -10,10
				        var transVertex = arraySum(vertex,move.translation);//The vertex, rotated and translated

				        var vertexPix = coordsToPixelsArray(this.world.width, this.world.width, transVertex[0], transVertex[1]);
				        this.shootGraphics.lineTo(vertexPix[0],vertexPix[1]);
				    } 
				    //We return to the first vertex, to close the polygon
			        var transVertex = arraySum(newPolygon[0],move.translation);//The vertex, rotated and translated
			        var vertexPix = coordsToPixelsArray(this.world.width, this.world.width, transVertex[0], transVertex[1]);
			        this.shootGraphics.lineTo(vertexPix[0],vertexPix[1]);
				    this.shootGraphics.endFill();
			    }

	    	}
	    	return;
	    },


	    startResolution : function(){

	    	//We freeze the shot
	      	//We get the current activity
			var activity = ((Activities.find({ id : 1 }).fetch())[0]);

			Meteor.subscribe('currentshoots');

	      	// For each team:
	        for(var i=1; i<=4; i++){
	        	//We insert the current shoot state as a move
	            var shoot = CurrentShoots.findOne(""+i);
				
	            if(shoot && shoot.polygon){
					var move = {
		            	 _id: ''+i,//This is so we only have one move per team (the log will store all of them)
		                 activity_id: activity.id,
		                 turn: turn,
		                 team: i,
		                 polygon: shoot.polygon,
		                 rotation: shoot.rotation,
		                 translation: shoot.translation,
		             };
		            Moves.upsert({ _id : ''+i }, move);
		        	var moveToLog = JSON.parse(JSON.stringify(move));
		        	delete moveToLog._id;//So that an unique one is generated
		        	moveToLog.timestamp = new Date().getTime();
		            MovesLog.insert(moveToLog);
	            }


	        }

	    	this.input.keyboard.clearCaptures();
		    this.state.start('Resolution');
	    }
	};


	//Resolution phase, where the teams polygons are placed on the screen, 
	//just before the actual shooting of the ball
	PolyfutGame.Resolution = function(){
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
	 
	PolyfutGame.Resolution.prototype = { 
	    preload : function(){ 
		  this.load.image('ball', 'ball.png');
	    }, 
	 
	    create : function(){ 



	    	//Take initial coordinates and speed from the previous phase, and draw them
		  var ball = this.add.sprite(coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).x,
		  	coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).y,
		  	'ball');
		  ball.anchor.setTo(0.5, 0.5);
          var initialtraj = this.add.graphics(ball.x,ball.y);
          initialtraj.lineStyle(2, 0x999999, 1);
          initialtraj.lineTo(initialvx,initialvy);

          //Draw the team polygons
          //TODO: for now, we put random polygons. They should come from this turn's database
          this.physics.startSystem(Phaser.Physics.P2JS);
          this.physics.p2.setImpactEvents(true);
          this.physics.p2.restitution = 1;
          this.physics.p2.applyDamping = false;
          this.physics.p2.applyGravity = false;
          this.physics.p2.applySpringForces = false;
          //this.physics.p2.onBeginContact.add(checkGoal,this);

          //Create the sprites, the corresponding graphics
          var moves = Moves.find().fetch();
          this.drawMovesGraphicsOnly(moves, ballInitialX, ballInitialY);

          //TODO: Substitute this with the real polygons!!!!
          // polygon1coords = generateRandomCoords(this.world.width, this.world.height);
          // var polygon1 = this.add.sprite(polygon1coords.x, polygon1coords.y);
          // polygon2coords = generateRandomCoords(this.world.width, this.world.height);
          // var polygon2 = this.add.sprite(polygon2coords.x, polygon2coords.y);
          // polygon3coords = generateRandomCoords(this.world.width, this.world.height);
          // var polygon3 = this.add.sprite(polygon3coords.x, polygon3coords.y);
          // polygon4coords = generateRandomCoords(this.world.width, this.world.height);
          // var polygon4 = this.add.sprite(polygon4coords.x, polygon4coords.y);
          //// Actually, we still do not need the physics enabled
          // this.physics.p2.enable([ ball, polygon1, polygon2, polygon3, polygon4 ], true);
          // polygon1.body.clearShapes();
          // polygon1.body.addPolygon({},0,0,100,0,100,100,0,100);
          // polygon1.body.static = true;

          // polygon2.body.clearShapes();
          // polygon2.body.addPolygon({},0,0,100,0,50,80);
          // polygon2.body.static = true;

          // polygon3.body.clearShapes();
          // polygon3.body.addPolygon({},0,0,50,0,100,100,50,100,0,50);
          // polygon3.body.static = true;

          // polygon4.body.clearShapes();
          // polygon4.body.addPolygon({},0,0,80,0,80,160,0,80);
          // polygon4.body.static = true;
			//ball.body.setCircle(16,-1,-1);
          //// --- END of random polygons



		  drawGrid();

		    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	keyN.onDown.add(this.startShooting, this);

	    	updateServerActivity(this.state.current,turn);

	    }, 
	 
	    update : function(){ 
	 
		    // your game loop goes here 
	    }, 

	    drawMovesGraphicsOnly : function(moves, ballx, bally){
	    	if(moves.length>4){
	    		console.log("Error! We have more than 4 teams!");
	    		return;
	    	}
		    var graphics = this.add.graphics();
	    	// For each team
	    	for(var i = 0; i < moves.length; i++){
	    		var move = moves[i];

	    		//We draw the polygon origin circle
			    var radius_origin = 20;//radius in pixels of the origin marker
			    graphics.beginFill(0x000000);
			    graphics.lineStyle(4, 0x000000, 1);
			    var originPix = coordsToPixelsArray(this.world.width, this.world.width, (move.translation)[0],(move.translation)[1]);
			    graphics.drawCircle(originPix[0], originPix[1], radius_origin);

			    //We draw the polygon itself, rotated/translated
			    //Transform (rotate the polygon vertices), in -10,10 scale from the original -1,1
			    var newPolygon = rotatePoints(move.polygon, move.rotation);

			    var isIllegalMove = isPolygonNearer(translatePoints(newPolygon,(move.translation)[0],(move.translation)[1]),ballx,bally,3.5);//
   		        if(!isIllegalMove){
   		        	graphics.lineStyle(2, 0x000000, 1);	
			        graphics.beginFill(teamColorsHex[move.team-1],0.8);
   		        }else{
   		        	graphics.lineStyle(3, 0xff0000, 1);	
			        graphics.beginFill(teamColorsHex[move.team-1],0.6);
   		        }

			    //We draw the polygon
			    graphics.moveTo(originPix[0],originPix[1]);
			    for (var j = 0; j < newPolygon.length; j++){
			        var vertex = newPolygon[j];//The vertex, rotated but centered on 0,0 with scale -10,10
			        var transVertex = arraySum(vertex,move.translation);//The vertex, rotated and translated

			        var vertexPix = coordsToPixelsArray(this.world.width, this.world.width, transVertex[0], transVertex[1]);
			        graphics.lineTo(vertexPix[0],vertexPix[1]);
			    } 
			    //We return to the first vertex, to close the polygon
		        var transVertex = arraySum(newPolygon[0],move.translation);//The vertex, rotated and translated
		        var vertexPix = coordsToPixelsArray(this.world.width, this.world.width, transVertex[0], transVertex[1]);
		        graphics.lineTo(vertexPix[0],vertexPix[1]);
			    graphics.endFill();

	    	}
	    	return;
	    },

	    startShooting : function(){

	    	this.input.keyboard.clearCaptures();
		    this.state.start('Shoot');
	    }

	};



	//Shooting phase, where the teams polygons are placed on the screen, 
	//but this time the ball actually shoots until goal is reached
	PolyfutGame.Shoot = function(){
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
		var ball;
	}; 
	 
	PolyfutGame.Shoot.prototype = { 
	    preload : function(){ 
		  this.load.image('ball', 'ball.png');
	    }, 

	    create : function(){ 

	    	//Take initial coordinates and speed from the previous phase, and draw them
		  ball = this.add.sprite(coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).x,
		  	coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).y,
		  	'ball');
		  ball.anchor.setTo(0.5, 0.5);
          var initialtraj = this.add.graphics(ball.x,ball.y);
          initialtraj.lineStyle(2, 0x999999, 1);
          initialtraj.lineTo(initialvx,initialvy);

          //Draw the team polygons
          //TODO: for now, we put random polygons. They should come from this turn's database
          this.physics.startSystem(Phaser.Physics.P2JS);
          this.physics.p2.setImpactEvents(true);
          this.physics.p2.restitution = 1;
          this.physics.p2.applyDamping = false;
          this.physics.p2.applyGravity = false;
          this.physics.p2.applySpringForces = false;
          this.physics.p2.onBeginContact.add(this.checkGoal,this);
          //this.physics.p2.onBeginContact.add(checkGoal,ball);

          var moves = Moves.find().fetch();
          var polygonsprites = this.drawMovesSprites(moves, ballInitialX, ballInitialY);

          // Delete this! Random polygons
          // var polygon1 = this.add.sprite(polygon1coords.x, polygon1coords.y);
          // var polygon2 = this.add.sprite(polygon2coords.x, polygon2coords.y);
          // var polygon3 = this.add.sprite(polygon3coords.x, polygon3coords.y);
          // var polygon4 = this.add.sprite(polygon4coords.x, polygon4coords.y);

          // this.physics.p2.enable([ ball, polygon1, polygon2, polygon3, polygon4 ], true);

          // polygon1.body.clearShapes();
          // polygon1.body.addPolygon({},0,0,100,0,100,100,0,100);
          // polygon1.body.static = true;

          // polygon2.body.clearShapes();
          // polygon2.body.addPolygon({},0,0,100,0,50,80);
          // polygon2.body.static = true;

          // polygon3.body.clearShapes();
          // polygon3.body.addPolygon({},0,0,50,0,100,100,50,100,0,50);
          // polygon3.body.static = true;

          // polygon4.body.clearShapes();
          // polygon4.body.addPolygon({},0,0,80,0,80,160,0,80);
          // polygon4.body.static = true;

          // ball.body.setCircle(16,-1,-1);
          //// --- END of random polygons


		  drawGrid();

		  //Shooting message and countdown
	    var text = this.add.text(this.world.centerX, this.world.centerY-30, 
	    	'Tir de balle' , 
	    	{ font: '36px Arial', fill: '#300' , align: 'center'});
	    text.anchor.set(0.5);

          setTimeout(function (){
          	text.destroy();
            initialtraj.clear();
            ball.body.velocity.x = initialvx;
            ball.body.velocity.y = initialvy;
          }, 3000);



			// This phase goes on until goal is reached, but still keep the N in case the ball gets stuck
		    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	keyN.onDown.add(this.startNewTurn, this);
	    	updateServerActivity(this.state.current,turn);

	    }, 
	 
	    update : function(){ 
	 
		    // your game loop goes here 
		    if(this.game.global.but){
		    	ball.destroy();

	          var message = this.add.text(this.game.world.centerX,this.game.world.centerY-30,'BUT!!!!',
	          	{ font: '36px Arial', fill: '#300' , align: 'center'})
    	      message.anchor.setTo(0.5,0.5);
	          var message2 = this.add.text(this.game.world.centerX,this.game.world.centerY+15,'Tapez sur "n" pour continuer',
	          	{ font: '16px Arial', fill: '#300' , align: 'center'})
    	      message2.anchor.setTo(0.5,0.5);

		     	
		    }
	    }, 

	    drawMovesSprites : function(moves, ballx, bally){
	    	var polygonsprites = [];
	    	if(moves.length>4){
	    		console.log("Error! We have more than 4 teams!");
	    		return;
	    	}
		    var graphics = this.add.graphics();
	    	// For each team
	    	for(var i = 0; i < moves.length; i++){
	    		var move = moves[i];

	    		//We draw the polygon origin circle
			    var radius_origin = 20;//radius in pixels of the origin marker
			    graphics.beginFill(0x000000);
			    graphics.lineStyle(4, 0x000000, 1);
			    var originPix = coordsToPixelsArray(this.world.width, this.world.height, (move.translation)[0],(move.translation)[1]);
			    graphics.drawCircle(originPix[0], originPix[1], radius_origin);

			    //Transform (rotate the polygon vertices), in -10,10 scale from the original -1,1
			    var newPolygon = rotatePoints(move.polygon, move.rotation);
			    
			    var isIllegalMove = isPolygonNearer(translatePoints(newPolygon,(move.translation)[0],(move.translation)[1]),ballx,bally,3.5);//
   		        if(!isIllegalMove){
   		        	graphics.lineStyle(2, 0x000000, 1);	
			        graphics.beginFill(teamColorsHex[move.team-1],0.8);
   		        }else{
   		        	graphics.lineStyle(3, 0xff0000, 1);	
			        graphics.beginFill(teamColorsHex[move.team-1],0.6);
   		        }



			    //We draw the polygon
			    graphics.moveTo(originPix[0],originPix[1]);
			    for (var j = 0; j < newPolygon.length; j++){
			        var vertex = newPolygon[j];//The vertex, rotated but centered on 0,0 with scale -10,10
			        var transVertex = arraySum(vertex,move.translation);//The vertex, rotated and translated

			        var vertexPix = coordsToPixelsArray(this.world.width, this.world.height, transVertex[0], transVertex[1]);
			        graphics.lineTo(vertexPix[0],vertexPix[1]);
			    } 
			    //We return to the first vertex, to close the polygon
		        var transVertex = arraySum(newPolygon[0],move.translation);//The vertex, rotated and translated
		        var vertexPix = coordsToPixelsArray(this.world.width, this.world.height, transVertex[0], transVertex[1]);
		        graphics.lineTo(vertexPix[0],vertexPix[1]);
			    graphics.endFill();

			    if(!isIllegalMove){
					var polygonsprite = this.add.sprite(originPix[0],originPix[1]);
	          		this.physics.p2.enable(polygonsprite, true);
	          		polygonsprite.body.clearShapes();
	          		//We add the polygon outline, in pixels counting from the origin of the sprite
	          		var newPolygonPix = [];
				    for (var j = 0; j < newPolygon.length; j++){
				        var vertex = newPolygon[j];//The vertex, rotated but centered on 0,0 with scale -10,10
				    	var vertexPix = arraySum(
				    		coordsToPixelsArray(this.world.width,this.world.height,vertex[0],vertex[1]),
				    		arrayMult(coordsToPixelsArray(this.world.width,this.world.height,0,0),-1)
				    		);
				    	newPolygonPix.push(vertexPix);
					}          		
	          		polygonsprite.body.addPolygon({},newPolygonPix);
	          		polygonsprite.body.static = true;
	          		polygonsprites.push(polygonsprite);
			    }
	    	}

	    	//We also add the ball to the physics engine
	    	this.physics.p2.enable(ball,true);
            ball.body.setCircle(16,-1,-1);

	    	return polygonsprites;
	    },

	    startNewTurn : function(){

	    	updateTeamPoints(this.game.global.teambut);

	    	this.game.global.but=false;
	    	this.game.global.teambut=0;


		    this.state.start('NewTurn');
	    	this.input.keyboard.clearCaptures();

	    },

	    checkGoal : function() {
			var game = this.game;
			
	        if ((ball.body.x<20 && ball.body.y>game.world.height*0.25 && ball.body.y<game.world.height*0.75 )){
				//Score in team 4 goal
	          game.global.but=true;
	          game.global.teambut=4;

	        }else if((ball.body.y<20 && ball.body.x>game.world.width*0.25 && ball.body.x<game.world.width*0.75 )){
				//Score in team 1 goal
	          game.global.but=true;
	          game.global.teambut=1;
	        }else if((ball.body.x>game.world.width-20 && ball.body.y>game.world.height*0.25 && ball.body.y<game.world.height*0.75 )){
				//Score in team 2 goal
	          game.global.but=true;
	          game.global.teambut=2;
	        }else if((ball.body.y>game.world.height-20 && ball.body.x>game.world.width*0.25 && ball.body.x<game.world.width*0.75 )){
				//Score in team 3 goal
	          game.global.but=true;
	          game.global.teambut=3;
	        }

	    }




	};


	//Attachment of the states above to the game, and starting of the game logic
    game.state.add('Initial',PolyfutGame.Initial);
    game.state.add('NewTurn',PolyfutGame.NewTurn);
    game.state.add('Resolution',PolyfutGame.Resolution);
    game.state.add('Shoot',PolyfutGame.Shoot);
    game.state.add('EndGame',PolyfutGame.EndGame);

    game.state.start('Initial');



}


function updateServerActivity(phase,turn){

	var active = (phase=="NewTurn" ? true : false);

    var activity = {
  		_id:"1",
		id: 1,
		title: 'Polygone Football',
		type: 'polyfut',
		current_state: {
			active: active,
			turn: turn,
			phase: phase,
			team1_points: Session.get('team1_points'),
			team2_points: Session.get('team2_points'),
			team3_points: Session.get('team3_points'),
			team4_points: Session.get('team4_points')
		}
	};

	Meteor.call('insertActivity',activity);

}



function updateTeamPoints(receivingTeam){

	var PT_PER_GOAL = 10;

	if(receivingTeam!=1) Session.set('team1_points',Session.get('team1_points')+PT_PER_GOAL);
	if(receivingTeam!=2) Session.set('team2_points',Session.get('team2_points')+PT_PER_GOAL);
	if(receivingTeam!=3) Session.set('team3_points',Session.get('team3_points')+PT_PER_GOAL);
	if(receivingTeam!=4) Session.set('team4_points',Session.get('team4_points')+PT_PER_GOAL);


}

function coordsToPixels(worldX,worldY,x,y){

	var pixelCoords = {};

	pixelCoords.x = Math.round((x+10)*(worldX/20));
	pixelCoords.y = Math.round(worldY-(y+10)*(worldY/20));


	return pixelCoords;
}

function coordsToPixelsArray(worldX,worldY,x,y){

	var pixelCoords = [];

	pixelCoords.push(Math.round((x+10)*(worldX/20)));
	pixelCoords.push(Math.round(worldY-(y+10)*(worldY/20)));


	return pixelCoords;
}

function generateRandomCoords(width, height, margin, separation){

        margin = typeof margin !== 'undefined' ? margin : 50;
        separation = typeof separation !== 'undefined' ? separation : 150;

        var xCoord = Math.floor((Math.random()*(width - margin - separation))+margin);
        var yCoord = Math.floor((Math.random()*(height - margin - separation))+separation);

        var coords = {
          x: xCoord,
          y: yCoord
        }                

        return coords;
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

//Translates a set of xy points by a certain x and y
function translatePoints(arrayCoords, transx, transy){
	var newArrayCoords = [];
	for (var i = 0; i < arrayCoords.length; i++){
		var vertex = arrayCoords[i];
		//we transform the angle to negative, since the formulas suppose counterclockwise rotation
		var newCoords = [vertex[0] + transx, vertex[1] + transy];
		newArrayCoords.push(newCoords);
	}

	return newArrayCoords;
}

//Translates a set of xy points around the origin, for a number of degrees, clockwise
function isPolygonNearer(arrayCoords, pointx, pointy, distance){
	var step = 20;
	//We iterate over the segments of the polygon
	for (var i = 0; i < arrayCoords.length; i++){
		var vertex1 = arrayCoords[i];
		var vertex2;
		if(i<arrayCoords.length-1) vertex2 = arrayCoords[i+1];
		else vertex2 = arrayCoords[0];

		//We generate the series of points along the segment, and calculate the distance to the point
		for(var j=0;j<=step;j++){
			var point = [(vertex1[0]*(step-j))/step+(j*vertex2[0]/step),(vertex1[1]*(step-j))/step+(j*vertex2[1]/step)];
			var dist = Math.sqrt(Math.pow(point[0]-pointx,2) + Math.pow(point[1]-pointy,2));
			if(dist<distance){
				return true;
			}
		}

	}

	return false;
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

//Does a vector multiplication by a constant
//The output is an array with the same dimension as the array
function arrayMult(array , constant){
    var mult = [];
    for (var i = 0; i < array.length; i++){
    	if(array[i].constructor === Array){//If the element is itself an array, we call recursively
    		var newArray = arrayMult(array[i],constant);
    		mult.push(newArray);
    	}
        else mult.push(array[i]*constant);
    }
    return mult;
}
