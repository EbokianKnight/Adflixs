var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');

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
  }
};
