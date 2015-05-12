//ROUTES FOR THE WHOLE WEBAPP

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'Polygone Football'}});
});

Router.route('/simpleactivity/:activitytitle', function () {
  // render the Home template with a custom data context
  var tit = decodeURI(this.params.activitytitle);
  this.render('simple', {data: {title: tit}});
});

Router.route('/demo', function () {
  // render the Home template with a custom data context
  this.render('demo');
});

Router.route('/new', function () {
  // render the Home template with a custom data context
  this.render('game', {data: {title: 'Polygone Football'}});
});


