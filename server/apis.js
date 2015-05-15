
// For now, the only one that can modify the activity state is the web-based game of the teacher 
//(from the ReST api only `GET`) at /activities
//  HTTP.publish({name: 'activities'}, function(data) {
//Full mount of activities at /api/activities
  HTTP.publish({collection: Activities}, function(data) {
    // this.userId, this.query, this.params
    return Activities.find({});
  });

  
// Anyone can post to the moves collection (e.g., the group lamps)
// Add access points for `GET`, `POST`, `PUT`, `DELETE` at /api/moves
//Access to the moves database not needed for now
HTTP.publish({collection: Moves}, function(data) {
    // this.userId, this.query, this.params
    return Moves.find({});
});


// Add access points for `POST`, `PUT`, `DELETE`
//HTTP.publish({collection: CurrentShoots});
//For now, we fully mount it
HTTP.publish({collection: CurrentShoots}, function(data) {
    // this.userId, this.query, this.params
    return CurrentShoots.find({});
});


// Add access points for `GET`
  HTTP.publish({name: 'activitieslog'}, function(data) {
    // this.userId, this.query, this.params
    return ActivitiesLog.find({});
  });

// Add access points for `GET`
  HTTP.publish({name: 'moveslog'}, function(data) {
    // this.userId, this.query, this.params
    return MovesLog.find({});
  });
