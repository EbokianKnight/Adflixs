var React = require('react');
var FeatureStore = require('../stores/feature_store');
var ApiUtil = require('../util/api_util');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      features: this.stringFeatures()
    };
  },

  componentDidMount: function() {
    ApiUtil.fetchFeatures();
    this.token = FeatureStore.addListener(this.getFeatures);
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  getFeatures: function () {
    this.setState({ features: this.stringFeatures() });
  },

  stringFeatures: function () {
    return FeatureStore.all().map(function(f, idx){
      return "url(" + f.largeUrl + ") no-repeat -9999px -9999px";
    }).join(',');
  },

  preloadImages: function () {
    if (this.state.features.length === 0) return;
    var preloader = <div key={1} id="preloader"
       style={{backgroundImage: this.state.features}}/>;
    return (
      <div>
        <div className="preload-images"/>
        { preloader }
      </div>
    );
  },

  render: function () {
    return(
      <div>
        { this.preloadImages() }
        {this.props.children}
      </div>
    );
  }
});
