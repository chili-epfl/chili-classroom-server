
Meteor.publish("activities", function () {
    return Activities.find();
  });


  Meteor.startup(function() {

    return Meteor.methods({

      removeAllMoves: function() {

        return Moves.remove({});

      },

      insertActivity: function(activity) {
      	//We substitute the current activity - it is a singleton with always id=1
      	Activities.upsert({id: 1},activity);

		//We also insert the activity in the log      	
        var activityToLog = JSON.parse(JSON.stringify(activity));
        delete activityToLog._id;//So that an unique one is generated
        activityToLog.timestamp = new Date().getTime();
        ActivitiesLog.insert(activityToLog);

      	return true;
      }



    });

  });
