
// For now, the only one that can modify the activity state is the web-based game of the teacher 
//(from the ReST api only `GET`) at /activities
  HTTP.publish({name: 'activities'}, function(data) {
    // this.userId, this.query, this.params
    return Activities.find({});
  });

  
// Anyone can post to the moves collection (e.g., the group lamps)
// Add access points for `GET`, `POST`, `PUT`, `DELETE` at /api/moves
//TODO: Introduce logic
HTTP.publish({collection: Moves}, function(data) {
    // this.userId, this.query, this.params
    return Moves.find({});
});