var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

SessionStore = new Store(AppDispatcher);

var _currentUser;
var _isLoggedIn = false;
var _flashedMessage = null;
var _myViews = {};

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return _isLoggedIn;
};

var setUser = function (payload) {
  _currentUser = payload.currentUser;
  _isLoggedIn = true;
  storeCollections(payload.currentUser.views);
  if (payload.callback) { payload.callback(); }
};

var destroySession = function (payload) {
  _currentUser = null;
  _isLoggedIn = false;
  if (payload.callback) { payload.callback(); }
};

var flashMessage = function (message) {
  _flashedMessage = message;
};

var storeCollections = function (views) {
  _myViews = {};
  views.forEach(function(view){
    _myViews[view.ad_id] = view;
  });
};

var updateView = function (view) {
  _myViews[view.ad_id] = view;
};

SessionStore.flashMessage = function () {
  var message = _flashedMessage;
  _flashedMessage = null;
  return message;
};

SessionStore.getViews = function () {
  return jQuery.extend({}, _myViews);
};

SessionStore.fetchView = function (adID) {
  if (_myViews[adID]) {
    return jQuery.extend({}, _myViews[adID]);
  } else {
    return false;
  }
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_USER:
      setUser(payload);
      SessionStore.__emitChange();
      break;
    case UserConstants.LOGOUT:
      destroySession(payload);
      SessionStore.__emitChange();
      break;
    case UserConstants.FLASH:
      flashMessage(payload.message);
      SessionStore.__emitChange();
      break;
    case UserConstants.UPDATE_VIEW:
      updateView(payload.view);
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
