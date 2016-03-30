var React = require('react');
var PropTypes = React.PropTypes;
var AdStore = require('../stores/ad_store');
var ApiUtil = require('../util/api_util');

var MainIndex = React.createClass({

	getInitialState: function() {
		return { ads: [] };
	},

	componentDidMount: function() {
		adStoreToken = AdStore.addListener(this.getStateFromStore);
	},

	componentWillUnmount: function() {
		adStoreToken.remove();
	},

	getStateFromStore: function() {
		this.setState({ ads: AdStore.all() });
	},

	render: function() {
		return (
			<div>Reached the Adds</div>
		);
	}

});

module.exports = MainIndex;
