var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var SessionStore = new Store(AppDispatcher);

var _currentUser;
var _isLoggedIn = false;

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return _isLoggedIn;
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
