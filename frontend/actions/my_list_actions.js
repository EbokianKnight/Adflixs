var Dispatcher = require('../dispatcher/dispatcher.js');
var MyListConstants = require('../constants/my_list_constants.js');

module.exports = {
  recieveMyList: function (list) {
    Dispatcher.dispatch({
      actionType: MyListConstants.MY_LIST,
      list: list
    });
  }
};
