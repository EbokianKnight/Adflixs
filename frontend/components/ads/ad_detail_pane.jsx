var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../actions/ad_actions');


var AdDetailPane = React.createClass({

	close_details: function () {
		AdAction.closeDetails();
	},

	render: function() {
		return (
			<div className="ad-detail-pane-box">
				<div className="ad-detail-pane">
					<button className="top-right-x" onClick={this.close_details}>X</button>
				</div>
			</div>
		);
	}
});

module.exports = AdDetailPane;
