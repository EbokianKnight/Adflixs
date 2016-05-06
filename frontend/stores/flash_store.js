var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var FlashStore = new Store(AppDispatcher);

var _message = null;
var log = [];

var resetMessage = function (message) {
	log.push(message);
	_message = message;
};

FlashStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case "THROWN_ERROR":
			resetMessage(payload.err);
			FlashStore.__emitChange();
		break;
	}
};

FlashStore.flashMessage = function () {
  var flash = _message;
  _message = null;
	return flash;
};

FlashStore.hasError = function () {
	return _message ? true : false;
};

module.exports = FlashStore;
