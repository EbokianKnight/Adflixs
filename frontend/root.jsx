var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app');
var HomePage = require('./components/homepage');
var HashHistory = require('react-router').HashHistory;

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{ routes }</Router>,
    document.getElementById('root')
  );
});
