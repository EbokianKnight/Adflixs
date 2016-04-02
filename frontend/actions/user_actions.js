var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');
var SessionConstants = require('../constants/session_constants');

module.exports = {
  registerNewUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.REGISTER_USER,
      user: user
    });
  },
  removeUser: function (userID) {
    AppDispatcher.dispatch({
      actionType: UserConstants.REMOVE_USER,
      userID: userID
    });
  },
  receiveCurrentUser: function ( currentUser, callback ) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECIEVE_USER,
      currentUser: currentUser,
      callback: callback
    });
  },
  logout: function (callback) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
      callback: callback
    });
  },
  flashMessage: function (message) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.FLASH,
      message: message,
    });
  }
};
