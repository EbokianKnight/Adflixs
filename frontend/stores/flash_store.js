var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var FlashConstants = require('../constants/flash_constants');

var FlashStore = new Store(AppDispatcher);

var _message = null;

var resetMessage = function (message) {
	_message = message;
};

FlashStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case FlashConstants.MESSAGE_RECEIVED:
			resetMessage(payload.message);
			FlashStore.__emitChange();
		break;
	}
};

FlashStore.flashMessage = function () {
  var flash = _message;
  _message = null;
	return flash;
};

module.exports = FlashStore;
