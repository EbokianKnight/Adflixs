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
var MainPage = require('./components/main_page');
var MainIndex = require('./components/ads/main_index');
var MainVideo = require('./components/main_video');
var NotFound = require('./components/not_found');
var NewUser = require('./components/signup/new_user');
var SignIn = require('./components/signup/new_session');
var Account = require('./components/account_panes/account_index');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="users/new" component={NewUser} />
    <Route path="signin" component={SignIn} />
    <Route path="main" component={MainPage} onEnter={_requireLoggedIn}>
      <IndexRoute component={MainIndex} />
    </Route>
    <Route path="streaming" component={MainVideo} onEnter={_requireLoggedIn}/>
    <Route path="account" component={Account} onEnter={_requireLoggedIn}/>
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
  if (!SessionStore.isLoggedIn()) {
    UserUtil.fetchCurrentUser(
      _redirectUnlessLogin.bind(this, replace, asyncCallback)
    );
  } else {
    _redirectUnlessLogin(replace, asyncCallback);
  }
}
