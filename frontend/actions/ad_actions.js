var Dispatcher = require('../dispatcher/dispatcher.js');
var AdConstants = require('../constants/ad_constants.js');

module.exports = {
	receiveAdvert: function (advert) {
    Dispatcher.dispatch({
      actionType: AdConstants.AD_RECEIVED,
      advert: advert
    });
  },

	closeDetails: function () {
		Dispatcher.dispatch({
      actionType: AdConstants.CLOSE_DETAILS,
    });
	},

  updateView: function (view) {
    Dispatcher.dispatch({
      actionType: AdConstants.UPDATE_VIEW,
      view: view
    });
  }
};
