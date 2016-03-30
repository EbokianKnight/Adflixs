var AppDispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');
var Store = require('flux/utils').Store;
var AdConstants = require('../constants/ad_constants');

var AdStore = new Store(AppDispatcher);

var _adverts = {};
var _ad = "";

var resetAdverts = function (ads) {
	_adverts = {};
	ads.forEach( function (el) { _advert[el.id] = el; });
};

var updateAdvert = function (ad) {
	_adverts[ad.id] = ad;
};


AdStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case AdConstants.ADS_RECEIVED:
			resetAdverts(payload.adverts);
			AdStore.__emitChange();
		break;
		case AdConstants.AD_RECEIVED:
			updateAdvert(payload.advert);
			AdStore.__emitChange();
		break;
	}
};

AdStore.all = function () {
	var ads = [];
	Object.keys(_adverts).forEach(function(id){
		ads.push(_adverts[id]);
	});
	return ads;
};

AdStore.find = function (id) {
	return _adverts[id];
};
