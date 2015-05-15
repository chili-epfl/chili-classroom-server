Meteor.publish("moves", function () {
    return Moves.find();
  });


Meteor.publish("currentshoots", function () {
    return CurrentShoots.find();
  });


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
      },

      freezeShoot: function(turn) {
      	//We get the current activity
		    var activity = ((Activities.find({ id : 1 }).fetch())[0]);

      	// For each team:
        for(var i=1; i<=4; i++){
        	//We insert the current shoot state as a move
            var shoot = CurrentShoots.findOne(""+i);
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


      	return true;
      }


    });

  });
