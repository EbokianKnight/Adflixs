var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var FeatureConstants = require('../constants/feature_constants');
var AdConstants = require('../constants/ad_constants');

var FeatureStore = new Store(AppDispatcher);

var _features = [];

var resetFeatures = function (ads) {
	_features = ads;
};

var updateFeature = function (adUpdate) {
	var toUpdate = false;
	_features = _features.map(function(ad){
		if (ad.id === adUpdate.id) {
			toUpdate = true;
			return adUpdate;
		} else {
			return ad;
		}
	});
	if (toUpdate) {
		FeatureStore.__emitChange();
	}
};

FeatureStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case FeatureConstants.FEATURES_RECEIVED:
			resetFeatures(payload.ads);
			FeatureStore.__emitChange();
			break;
		case AdConstants.AD_RECEIVED:
			updateFeature(payload.advert);
			break;
	}
};

FeatureStore.all = function () {
	return _features.slice();
};

module.exports = FeatureStore;
