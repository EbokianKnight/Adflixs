var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AdConstants = require('../constants/ad_constants');

var AdStore = new Store(AppDispatcher);

var _adverts = {};
var _shownAd = null;
var _recievedAd = false;

var resetAdverts = function (ads) {
	_adverts = {};
	ads.forEach( function (el) { _advert[el.id] = el; });
};

var updateAdvert = function (ad) {
	_shownAd = ad;
};

var clearShownAd = function () {
	_shownAd = null;
};

AdStore.successMessage = function () {
	var flash = _recievedAd;
	console.log(flash);
	_recievedAd = false;
	return flash;
};

AdStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case AdConstants.ADS_RECEIVED:
			resetAdverts(payload.adverts);
			_recievedAd = true;
			AdStore.__emitChange();
		break;
		case AdConstants.AD_RECEIVED:
			updateAdvert(payload.advert);
			_recievedAd = true;
			AdStore.__emitChange();
		break;
		case AdConstants.CLOSE_DETAILS:
			_recievedAd = true;
			clearShownAd();
			AdStore.__emitChange();
	}
};

AdStore.all = function () {
	var ads = [];
	Object.keys(_adverts).forEach(function(id){
		ads.push(_adverts[id]);
	});
	return ads;
};

AdStore.getAd = function () {
	var copy = Object.assign({}, _shownAd);
	return copy;
};

module.exports = AdStore;
