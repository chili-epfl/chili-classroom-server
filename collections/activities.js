Activities = new Meteor.Collection('activities');

Meteor.publish("activities", function () {
    return Activities.find();
  });