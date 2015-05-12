
  //LOGIC FOR THE DEMO ANIMATION
  //We load the demo animation when its template is rendered
  Template.demo.rendered = function() {

      var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDemoContainer', 
        { preload: preload, create: create, update: update, render: render }, true);

      var ball;
      var polygon1;
      var polygon2;
      var polygon3;
      var polygon4;

      function preload () {

          game.load.image('ball', 'ball.png');

      }

      function create () {

          //game.physics.startSystem(Phaser.Physics.ARCADE);
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.setImpactEvents(true);
          game.physics.p2.restitution = 1;
          game.physics.p2.applyDamping = false;
          game.physics.p2.applyGravity = false;
          game.physics.p2.applySpringForces = false;
          game.physics.p2.onBeginContact.add(checkGoal,this);


          //We draw the goals in the four walls
          var goals = game.add.graphics(0,0);
          goals.lineStyle(10,0x000000,1);
          goals.moveTo(0,game.world.height*0.25);
          goals.lineTo(0,game.world.height*0.75);
          goals.moveTo(game.world.width*0.25,0);
          goals.lineTo(game.world.width*0.75,0);

          goals.moveTo(game.world.width,game.world.height*0.25);
          goals.lineTo(game.world.width,game.world.height*0.75);
          goals.moveTo(game.world.width*0.25,game.world.height);
          goals.lineTo(game.world.width*0.75,game.world.height);

          setupStartGame();


      }

      function setupStartGame() {

          ball = game.add.sprite(game.width-30,game.height-30,'ball');
          //TODO: modify to make polygons not touch each other and not touch borders!
          var coordSet = [];
          var randomCoords = generateRandomNotTouching(game.world.width, game.world.height, coordSet);
          coordSet.push(randomCoords);
          polygon1 = game.add.sprite(randomCoords.x, randomCoords.y);
          randomCoords = generateRandomNotTouching(game.world.width, game.world.height, coordSet);
          coordSet.push(randomCoords);
          polygon2 = game.add.sprite(randomCoords.x, randomCoords.y);
          randomCoords = generateRandomNotTouching(game.world.width, game.world.height, coordSet);
          coordSet.push(randomCoords);
          polygon3 = game.add.sprite(randomCoords.x, randomCoords.y);
          randomCoords = generateRandomNotTouching(game.world.width, game.world.height, coordSet);
          coordSet.push(randomCoords);
          polygon4 = game.add.sprite(randomCoords.x, randomCoords.y);

          game.physics.p2.enable([ ball, polygon1, polygon2, polygon3, polygon4 ], true);

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

          var initialvx = Math.floor(Math.random()*(-300));
          var initialvy = Math.floor(Math.random()*(-300));
          var initialtraj = game.add.graphics(ball.body.x,ball.body.y);
          initialtraj.lineStyle(2, 0x999999, 1);
          initialtraj.lineTo(initialvx,initialvy);
          // initialtraj.lineStyle(2, 0xd0d0d0, 1);
          // initialtraj.arc(ball.body.x,ball.body.y,
          //   Math.max(initialvx*0.75,initialvy*0.75),
          //   Math.PI,Math.PI+Math.asin(-initialvy/Math.sqrt(initialvy*initialvy+initialvx*initialvx)));



          setTimeout(function (){
            initialtraj.clear();
            ball.body.velocity.x = initialvx;
            ball.body.velocity.y = initialvy;
          }, 5000);

      }


      function update () {


      }

      function render () {


      }

      function generateRandomNotTouching(width, height, coordSet, margin, separation){

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


      function checkGoal () {
        if ((ball.body.x<20 && ball.body.y>game.world.height*0.25 && ball.body.y<game.world.height*0.75 ) ||
          (ball.body.y<20 && ball.body.x>game.world.width*0.25 && ball.body.x<game.world.width*0.75 ) ||
          (ball.body.x>game.world.width-20 && ball.body.y>game.world.height*0.25 && ball.body.y<game.world.height*0.75 ) ||
          (ball.body.y>game.world.height-20 && ball.body.x>game.world.width*0.25 && ball.body.x<game.world.width*0.75 )){

          ball.destroy();
          polygon1.destroy();
          polygon2.destroy();
          polygon3.destroy();
          polygon4.destroy();

          var message = game.add.text(game.world.centerX,game.world.centerY,'BUT!!!!')
          message.anchor.setTo(0.5,0.5);


          setTimeout(function (){
            message.destroy();
            setupStartGame();
          }, 5000);

        }

      }

      function contactAnimation (){
        game.physics.p2.paused = true;

        //TODO: draw the angle of impact (not so needed in fact, leave it for later)
        //
        var graphics = game.add.graphics(ball.body.x,ball.body.y);

        //var text = game.add.text(game.world.centerX,game.world.centerY,
        //  "position: "+Math.floor(ball.body.x)+","+Math.floor(ball.body.y)+
        //  "\nvelocity: "+Math.floor(ball.body.velocity.x)+","+Math.floor(ball.body.velocity.y));


        graphics.lineStyle(2, 0xd9d9d9, 1);
        graphics.lineTo(ball.body.x-ball.body.velocity.x,ball.body.y+ball.body.velocity.y);

        //We wait for 5 secs until we continue the whole thing
        setTimeout(function (){
          //text.destroy();
          graphics.clear();
          game.physics.p2.paused = false;
        }, 5000);
      }

  };


