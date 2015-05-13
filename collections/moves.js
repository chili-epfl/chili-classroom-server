Moves = new Meteor.Collection('moves');

Meteor.publish("moves", function () {
    return Moves.find();
  });