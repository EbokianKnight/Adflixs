var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);

var _users = {};

var resetAdverts = function (users) {
	_users = users;
};

var updateAdvert = function (ad) {
	_shownAd = ad;
};

var clearShownAd = function () {
	_shownAd = null;
};

UserStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case AdConstants.ADS_RECEIVED:
			resetAdverts(payload.adverts);
			UserStore.__emitChange();
		break;
		case AdConstants.AD_RECEIVED:
			updateAdvert(payload.advert);
			UserStore.__emitChange();
		break;
		case AdConstants.CLOSE_DETAILS:
			clearShownAd();
			UserStore.__emitChange();
	}
};

UserStore.all = function () {
	var ads = [];
	Object.keys(_adverts).forEach(function(id){
		ads.push(_adverts[id]);
	});
	return ads;
};

UserStore.getAd = function () {
	var copy = Object.assign({}, _shownAd);
	return copy;
};

module.exports = UserStore;
