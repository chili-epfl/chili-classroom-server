

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllMoves: function() {

        return Moves.remove({});

      }

    });

  });
