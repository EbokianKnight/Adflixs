var React = require('react');
var PropTypes = React.PropTypes;
var FeatureStore = require('../../stores/feature_store');
var DetailMain = require('./feature_panes/detail_main');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');

var FeatureHeader = React.createClass({

  getInitialState: function() {
    return {
      features: [],
      shown: 0
    };
  },

  componentDidMount: function() {
    this.featureToken = FeatureStore.addListener(this.getFeaturesFromStore);
    ApiUtil.fetchFeatures();
    this.slides = window.setInterval(this.alternateFeatures, 15000);
  },

  getFeaturesFromStore: function () {
    this.setState({ features: FeatureStore.all() });
  },

  componentWillUnmount: function() {
    this.featureToken.remove();
    window.clearInterval(this.slides);
  },

  alternateFeatures: function () {
    var slide = this.state.shown;
    var nextup = (slide + 1) >= this.state.features.length ? 0 : slide+1;
    this.setState({ shown: nextup });
  },

  renderFeatures: function () {
    return (
      <DetailMain ad={this.state.features[this.state.shown]} header={true}/>
    );
  },

  render: function() {
    if (this.state.features.length === 0) { return <div/>; }
    return (
      <div className="main-index-header">

          { this.renderFeatures() }

      </div>
    );
  }

});

module.exports = FeatureHeader;
