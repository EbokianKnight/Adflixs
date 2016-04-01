var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var App = require('./components/app');
var HomePage = require('./components/homepage');
var MainIndex = require('./components/ads/main_index');
var NotFound = require('./components/not_found');
var Test = require('./components/simple_slider');
var NewUser = require('./components/signup/new_user');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
		<Route path="ads" component={MainIndex} />

		<Route path="users/new" component={NewUser} />
		<Route path="test" component={Test}/>
    <Route path="*" component={NotFound}/>
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={browserHistory}>{ routes }</Router>,
    document.getElementById('root')
  );
});
