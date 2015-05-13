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
Template.game.rendered = function() {

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer', 
       null, true);

    game.global = {
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
		  
          initialvx = ballInitialX > 0 ? Math.floor(Math.random()*(-this.world.width/4)) : Math.floor(Math.random()*(this.world.width/4));
          initialvy = ballInitialY > 0 ? Math.floor(Math.random()*(this.world.height/4)) : Math.floor(Math.random()*(-this.world.height/4));

          var initialtraj = game.add.graphics(ball.x,ball.y);
          initialtraj.lineStyle(2, 0x999999, 1);
          initialtraj.lineTo(initialvx,initialvy);



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
	 		//TODO: Optionally, display here in real time the current state of polygon, rotation and translation, from the database
		    // your game loop goes here 
	    }, 

	    startResolution : function(){

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

	    	//We freeze the shot
    	    Meteor.call('freezeShoot',turn);



	    	//Take initial coordinates and speed from the previous phase, and draw them
		  var ball = this.add.sprite(coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).x,
		  	coordsToPixels(this.world.width,this.world.height,ballInitialX,ballInitialY).y,
		  	'ball');
		  ball.anchor.setTo(0.5, 0.5);
          var initialtraj = game.add.graphics(ball.x,ball.y);
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

          polygon1coords = generateRandomCoords(this.world.width, this.world.height);
          var polygon1 = this.add.sprite(polygon1coords.x, polygon1coords.y);
          polygon2coords = generateRandomCoords(this.world.width, this.world.height);
          var polygon2 = this.add.sprite(polygon2coords.x, polygon2coords.y);
          polygon3coords = generateRandomCoords(this.world.width, this.world.height);
          var polygon3 = this.add.sprite(polygon3coords.x, polygon3coords.y);
          polygon4coords = generateRandomCoords(this.world.width, this.world.height);
          var polygon4 = this.add.sprite(polygon4coords.x, polygon4coords.y);

          this.physics.p2.enable([ ball, polygon1, polygon2, polygon3, polygon4 ], true);

          polygon1.body.clearShapes();
          polygon1.body.addPolygon({},0,0,100,0,100,100,0,100);
          polygon1.body.static = true;

          polygon2.body.clearShapes();
          polygon2.body.addPolygon({},0,0,100,0,50,80);
          polygon2.body.static = true;

          polygon3.body.clearShapes();
          polygon3.body.addPolygon({},0,0,50,0,100,100,50,100,0,50);
          polygon3.body.static = true;

          polygon4.body.clearShapes();
          polygon4.body.addPolygon({},0,0,80,0,80,160,0,80);
          polygon4.body.static = true;

          ball.body.setCircle(16,-1,-1);
          //// --- END of random polygons


		  drawGrid();

		    var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	keyN.onDown.add(this.startShooting, this);

	    	updateServerActivity(this.state.current,turn);

	    }, 
	 
	    update : function(){ 
	 
		    // your game loop goes here 
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
          var initialtraj = game.add.graphics(ball.x,ball.y);
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

          var polygon1 = this.add.sprite(polygon1coords.x, polygon1coords.y);
          var polygon2 = this.add.sprite(polygon2coords.x, polygon2coords.y);
          var polygon3 = this.add.sprite(polygon3coords.x, polygon3coords.y);
          var polygon4 = this.add.sprite(polygon4coords.x, polygon4coords.y);

          this.physics.p2.enable([ ball, polygon1, polygon2, polygon3, polygon4 ], true);

          polygon1.body.clearShapes();
          polygon1.body.addPolygon({},0,0,100,0,100,100,0,100);
          polygon1.body.static = true;

          polygon2.body.clearShapes();
          polygon2.body.addPolygon({},0,0,100,0,50,80);
          polygon2.body.static = true;

          polygon3.body.clearShapes();
          polygon3.body.addPolygon({},0,0,50,0,100,100,50,100,0,50);
          polygon3.body.static = true;

          polygon4.body.clearShapes();
          polygon4.body.addPolygon({},0,0,80,0,80,160,0,80);
          polygon4.body.static = true;

          ball.body.setCircle(16,-1,-1);
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



			// This phase goes on until goal is reached
		    // var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	// keyN.onDown.add(this.startShooting, this);
	    	updateServerActivity(this.state.current,turn);

	    }, 
	 
	    update : function(){ 
	 
		    // your game loop goes here 
		    if(this.game.global.but){
		    	ball.destroy();

	          var message = this.game.add.text(this.game.world.centerX,this.game.world.centerY-30,'BUT!!!!',
	          	{ font: '36px Arial', fill: '#300' , align: 'center'})
    	      message.anchor.setTo(0.5,0.5);
	          var message2 = this.game.add.text(this.game.world.centerX,this.game.world.centerY+15,'Tapez sur "n" pour continuer',
	          	{ font: '16px Arial', fill: '#300' , align: 'center'})
    	      message2.anchor.setTo(0.5,0.5);

		     var keyN = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    	 keyN.onDown.add(this.startNewTurn, this);
		     	
		    }
	    }, 

	    startNewTurn : function(){

	    	updateTeamPoints(this.game.global.teambut);

	    	this.game.global.but=false;
	    	this.game.global.teambut=0;


		    this.state.start('NewTurn');
	    	//this.input.keyboard.clearCaptures();

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

