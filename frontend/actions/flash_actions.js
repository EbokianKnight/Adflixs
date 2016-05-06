var Dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
	throwError: function (err) {
    Dispatcher.dispatch({
      actionType: "THROWN_ERROR",
      err: err
    });
  },
};
