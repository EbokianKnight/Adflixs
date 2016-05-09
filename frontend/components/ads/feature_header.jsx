var React = require('react');
var PropTypes = React.PropTypes;
var FeatureStore = require('../../stores/feature_store');
var DetailMain = require('./feature_panes/detail_main');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');

var FeatureHeader = React.createClass({

  getInitialState: function() {
    return {
      features: FeatureStore.all(),
      shown: 0,
      loaded: false,
      hover: false,
    };
  },

  componentDidMount: function() {
    this.featureToken = FeatureStore.addListener(this.getFeaturesFromStore);
    if (this.state.features.length < 1) {
      ApiUtil.fetchFeatures();
    }
    if (!this.state.loaded) {
			this.setState({ loaded: true });
		}
  },

  getFeaturesFromStore: function () {
    this.setState({ features: FeatureStore.all() });
  },

  componentWillUnmount: function() {
    this.featureToken.remove();
  },

  mouseOn: function () {
    this.setState({ hover:true });
  },

  mouseOff: function () {
    this.setState({ hover:false });
  },

  seekPage: function (e) {
    this.setState({ currentFocus: e.target.value });
  },

  nextFeatures: function () {
    var slide = this.state.shown;
    var nextup = (slide + 1) >= this.state.features.length ? 0 : slide + 1;
    this.setState({ shown: nextup });
  },

  previousFeatures: function () {
    var slide = this.state.shown;
    var nextup = (slide - 1) < 0 ? this.state.features.length - 1 : slide - 1;
    this.setState({ shown: nextup });
  },

  renderFeatures: function () {
    return (
      <DetailMain key={this.state.shown}
        ad={this.state.features[this.state.shown]}
        header={this.nextFeatures}
        refresh={this.refreshState}/>
    );
  },

  refreshState: function (adID) {
		if (adID) {
			ApiUtil.fetchAdvert(adID, "Feature");
		}
	},

  render: function() {
    if (this.state.features.length === 0) { return <div/>; }
    var hover = this.state.hover ? "" : " acc-hide";
    var load = this.state.loaded ? "" : " acc-hide";
    return (
      <div className={"main-index-header" + load}
        onMouseEnter={this.mouseOn}
				onMouseLeave={this.mouseOff}>

        <div className={"index-header-arrow index-arrows-left" + hover}
          onClick={this.previousFeatures}>
          <div className="a-left"/>
        </div>

        { this.renderFeatures() }

        <div className={"index-header-arrow index-arrows-right" + hover}
          onClick={this.nextFeatures}>
          <div className="a-right"/>
        </div>

      </div>
    );
  }

});

module.exports = FeatureHeader;
