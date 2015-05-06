//ROUTES FOR THE WHOLE WEBAPP

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

Router.route('/simpleactivity/:activitytitle', function () {
  // render the Home template with a custom data context
  var tit = decodeURI(this.params.activitytitle);
  this.render('simple', {data: {title: tit}});
});

Router.route('/demo', function () {
  // render the Home template with a custom data context
  this.render('demo');
});





// OTHER LOGIC (delete?)

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });


  //LOGIC FOR THE DEMO ANIMATION
  //We load the demo animation when its template is rendered
  Template.demo.rendered = function() {

      var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDemoContainer', 
        { preload: preload, create: create, update: update, render: render }, true);

      var polysprite1;
      var polysprite2;
      var polysprite3;
      var polysprite4;
      var emitter;

      function preload () {

          game.load.image('polygon', 'octagon.png');
          game.load.image('ball', 'ball.png');

      }

      function create () {

          game.physics.startSystem(Phaser.Physics.ARCADE);

          initializeDemoGame();

      }

      function initializeDemoGame() {

        //TODO: Redo this with the code in http://phaser.io/examples/v2/p2-physics/collision-groups

        polysprite1 = game.add.sprite(Math.floor((Math.random() * game.width)), Math.floor((Math.random() * game.height)), 'polygon');
        polysprite1.anchor.x = 0.5;
        polysprite1.anchor.y = 0.5;
        polysprite1.scale.setTo(0.3, 0.3);
        polysprite1.name = 'poly1';
        game.physics.enable(polysprite1, Phaser.Physics.ARCADE);
        polysprite1.body.immovable = true;
        
        polysprite2 = game.add.sprite(Math.floor((Math.random() * game.width)), Math.floor((Math.random() * game.height)), 'polygon');
        polysprite2.anchor.x = 0.5;
        polysprite2.anchor.y = 0.5;
        polysprite2.scale.setTo(0.3, 0.3);
        polysprite2.name = 'poly2';
        game.physics.enable(polysprite2, Phaser.Physics.ARCADE);
        polysprite2.body.immovable = true;

        polysprite3 = game.add.sprite(Math.floor((Math.random() * game.width)), Math.floor((Math.random() * game.height)), 'polygon');
        polysprite3.anchor.x = 0.5;
        polysprite3.anchor.y = 0.5;
        polysprite3.scale.setTo(0.3, 0.3);
        polysprite3.name = 'poly3';
        game.physics.enable(polysprite3, Phaser.Physics.ARCADE);
        polysprite3.body.immovable = true;

        polysprite4 = game.add.sprite(Math.floor((Math.random() * game.width)), Math.floor((Math.random() * game.height)), 'polygon');
        polysprite4.anchor.x = 0.5;
        polysprite4.anchor.y = 0.5;
        polysprite4.scale.setTo(0.3, 0.3);
        polysprite4.name = 'poly4';
        game.physics.enable(polysprite4, Phaser.Physics.ARCADE);
        polysprite4.body.immovable = true;

        ballsprite = game.add.sprite(game.width, game.height, 'ball');
        ballsprite.anchor.x = 0.5;
        ballsprite.anchor.y = 0.5;
        ballsprite.name = 'ball';
        game.physics.enable(ballsprite, Phaser.Physics.ARCADE);
        ballsprite.body.collideWorldBounds=true;

        ballsprite.body.bounce.setTo=(1,1);

      }

      function update () {

        game.physics.arcade.collide(ballsprite, polysprite1);
        game.physics.arcade.collide(ballsprite, polysprite2);
        game.physics.arcade.collide(ballsprite, polysprite3);
        game.physics.arcade.collide(ballsprite, polysprite4);


      }

      function render () {


      }

  };



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

