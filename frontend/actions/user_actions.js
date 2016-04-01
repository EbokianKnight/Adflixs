var Dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');
var SessionConstants = require('../constants/session_constants');

module.exports = {
  registerNewUser: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.REGISTER_USER,
      user: user
    });
  },
  removeUser: function (userID) {
    Dispatcher.dispatch({
      actionType: UserConstants.REMOVE_USER,
      userID: userID
    });
  },
  currentUserRecieved: function (currentUser) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECIEVE_USER,
      currentUser: currentUser
    });
  },
  logout: function () {
    Dispatcher.dispatch({
      actionType: UserConstants.LOGOUT,
    });
  }
};
