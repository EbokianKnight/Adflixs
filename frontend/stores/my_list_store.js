var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var MyListConstants = require('../constants/my_list_constants');

var MyListStore = new Store(AppDispatcher);

var _list = [];

var resetMyList = function (list) {
	_list = list;
};

MyListStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case MyListConstants.MY_LIST:
			resetMyList(payload.list);
			MyListStore.__emitChange();
			break;
	}
};

MyListStore.all = function () {
	var genres = [];
	Object.keys(_list).forEach(function(id){
		genres.push(_list[id]);
	});
	return genres;
};

MyListStore.find = function (adID) {
	for (var i = 0; i < _list.length; i++) {
		if (_list[i].ad_id === adID) {
			return true;
		}
	}
	return false;
};

module.exports = MyListStore;
