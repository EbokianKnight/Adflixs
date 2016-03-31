var Dispatcher = require('../dispatcher/dispatcher.js');
var AdConstants = require('../constants/ad_constants.js');

module.exports = {
  recieveAllAdverts: function (adverts) {
    Dispatcher.dispatch({
      actionType: AdConstants.ADS_RECEIVED,
      adverts: adverts
    });
  },

	recieveAdvert: function (advert) {
    Dispatcher.dispatch({
      actionType: AdConstants.AD_RECEIVED,
      advert: advert
    });
  },

	closeDetails: function () {
		Dispatcher.dispatch({
      actionType: AdConstants.CLOSE_DETAILS,
    });
	}
};
