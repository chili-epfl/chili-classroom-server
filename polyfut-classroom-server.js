//ROUTES FOR THE WHOLE WEBAPP

Router.route('/', function () {
  // render the demo template with a custom data context
  var activity = {
  		_id:"1",
		id: 1,
		title: 'Polygone Football',
		type: 'polyfut',
		current_state: {
			active: false,
			turn: 0,
			phase: null,
			team1_points: 0,
			team2_points: 0,
			team3_points: 0,
			team4_points: 0
		}
	};
    Meteor.call('insertActivity',activity);
  this.render('Home', {data: {title: 'Polygone Football'}});

});

Router.route('/simpleactivity/:activitytitle', function () {
  // render the Home template with a custom data context
  var tit = decodeURI(this.params.activitytitle);
  var activity = {
  		_id:"1",
		id: 1,
		title: tit,
		type: 'simple',
		current_state: {
			active: true,
			turn: 0,
			phase: null,
			team1_points: 0,
			team2_points: 0,
			team3_points: 0,
			team4_points: 0
		}
	};
    Meteor.call('insertActivity',activity);
    var img = this.params.query.image;
    var hasImg = false;
    if(img && img.length>0) hasImg=true;
    console.log("params"+this.params.query+"img "+img+" hasimg"+hasImg);
    this.render('simple', {data: {title: tit, hasImg: hasImg, img: img}});
});

Router.route('/demo', function () {
  // render the demo template with a custom data context
  var activity = {
  		_id:"1",
		id: 1,
		title: 'Polygone Football Demo',
		type: 'polyfut-demo',
		current_state: {
			active: false,
			turn: 0,
			phase: null,
			team1_points: 0,
			team2_points: 0,
			team3_points: 0,
			team4_points: 0
		}
	};
    Meteor.call('insertActivity',activity);
  	this.render('demo');
});

Router.route('/new', {
  // render the Home template with a custom data context, waiting for some collection subscriptions?
  	 waitOn : function () {
     		return [Meteor.subscribe('activities'),Meteor.subscribe('currentshoots'),Meteor.subscribe('moves')];
  		},
  	action : function() {
  		if(this.ready()){
		    var activity = {
		  		_id:"1",
				id: 1,
				title: 'Polygone Football',
				type: 'polyfut',
				current_state: {
					active: false,
					turn: 0,
					phase: 'Initial',
					team1_points: 0,
					team2_points: 0,
					team3_points: 0,
					team4_points: 0
				}
			};
	    	Meteor.call('insertActivity',activity);
	  		this.render('game', {data: {title: 'Polygone Football'}});
  		}

  	}
});


