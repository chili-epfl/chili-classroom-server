CurrentShoots = new Meteor.Collection('currentshoots');

Meteor.publish("currentshoots", function () {
    return CurrentShoots.find();
  });