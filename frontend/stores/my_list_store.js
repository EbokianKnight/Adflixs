var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var MyListConstants = require('../constants/my_list_constants');

var MyListStore = new Store(AppDispatcher);

var _list = [];

var resetMyList = function (list) {
	_list = list;
};

var addToMyList = function (ad) {
	_list.push(ad);
};

var removeFromMyList = function (ad) {
	var index = MyListStore.indexOf(ad);
	_list.splice(index, 1);
};

MyListStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case MyListConstants.MY_LIST:
			resetMyList(payload.list);
			MyListStore.__emitChange();
			break;
		case MyListConstants.ADD_TO:
			addToMyList(payload.ad);
			MyListStore.__emitChange();
			break;
		case MyListConstants.REMOVE_FROM:
			removeFromMyList(payload.ad);
			MyListStore.__emitChange();
			break;
	}
};

MyListStore.all = function () {
	return _list.slice();
};

MyListStore.includes = function (ad) {
	for (var i = 0; i < _list.length; i++) {
		if (_list[i].id === ad.id) {
			return true;
		}
	}
	return false;
};

MyListStore.indexOf = function (ad) {
	for (var i = 0; i < _list.length; i++) {
		if (_list[i].id === ad.id) {
			return i;
		}
	}
	return false;
};

module.exports = MyListStore;
