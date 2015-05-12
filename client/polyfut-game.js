//LOGIC FOR THE ACTUAL GAME
//We load the demo animation when its template is rendered
Template.game.rendered = function() {

      var game = new Phaser.Game(550, 400, Phaser.AUTO, 'gameContainer', 
        { preload: preload, create: create, update: update, render: render }, true);


      function preload () {

          game.load.image('ball', 'ball.png');

      }

      function create () {

          var ball = game.add.sprite(game.width-30,game.height-30,'ball');


      }



      function update () {


      }

      function render () {


      }



}