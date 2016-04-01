var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');

var SessionStore = new Store(AppDispatcher);

var _currentUser;
var _currentUserHasBeenFetched = false;

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return !!_currentUser;
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.RECIEVE_USER:
      _currentUser = payload.currentUser;
      _currentUserHasBeenFetched = true;
      break;
    case SessionConstants.LOGOUT:
      _currentUser = null;
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
