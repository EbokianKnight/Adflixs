var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var SessionStore = require('./stores/session_store');
var UserUtil = require('./util/user_util');

var App = require('./components/app');
var HomePage = require('./components/homepage');
var MainIndex = require('./components/ads/main_index');
var NotFound = require('./components/not_found');
var Test = require('./components/simple_slider');
var NewUser = require('./components/signup/new_user');
var SignIn = require('./components/signup/new_session');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="users/new" component={NewUser} />
    <Route path="signin" component={SignIn} />

		<Route path="ads" component={MainIndex} />
		<Route path="test" component={Test} />
    <Route path="*" component={NotFound}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={browserHistory}>{ routes }</Router>,
    document.getElementById('root')
  );
});

function _redirectUnlessLogin(replace, callback) {
  if (!SessionStore.isLoggedIn()) { replace("/signin"); }
  callback();
}

function _requireLoggedIn(nextState, replace, asyncCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    debugger;
    UserUtil.fetchCurrentUser(_redirectUnlessLogin(replace, asyncCallback));
  } else {
    _redirectUnlessLogin(replace, asyncCallback);
  }
}
