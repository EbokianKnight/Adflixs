var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var SessionStore = new Store(AppDispatcher);

var _currentUser;
var _isLoggedIn = false;
var _flashedMessage = null;

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return _isLoggedIn;
};

var makeSession = function (payload) {
  _currentUser = payload.currentUser;
  _isLoggedIn = true;
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

SessionStore.flashMessage = function () {
  var message = _flashedMessage;
  _flashedMessage = null;
  return message;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.RECIEVE_USER:
      makeSession(payload);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      destroySession(payload);
      SessionStore.__emitChange();
      break;
    case SessionConstants.FLASH:
      flashMessage(payload.message);
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
