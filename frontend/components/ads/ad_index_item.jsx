var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var MyButton = require('./my_list/my_button');
var Stars = require('./feature_panes/stars');
var AdStore = require('../../stores/ad_store');

var Advert = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	getInitialState: function() {
		return {
			details: false,
			hover: false
		};
	},

	componentWillUnmount: function() {
		this.timedMouse && clearTimeout(this.timedMouse);
		this.timedSelection && clearTimeout(this.timedSelection);
		this.timedMouse = undefined;
		this.timedSelection = undefined;
	},

	componentDidUpdate: function(prevProps, prevState) {
		// If you just started hovering for the first time...
		// If the timer has been started, skip this step.
		if (this.state.hover && !this.state.details && !prevState.hover && !this.timedMouse) {
			// Start a timer to update again
			this.timedMouse = window.setTimeout(function(){
				this.setState({ details: true });
				this.timedMouse = undefined;
			}.bind(this), 400);

			// If you started the timer but moused off before it timedout...
		} else if (!this.state.details && !this.state.hover && this.timedMouse) {
			// then immediately stop the timer
			clearInterval(this.timedMouse)
			this.timedMouse = undefined;
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return nextState !== this.state || this.props.show !== nextProps.show;
	},

	// Update the Store with the last row that was clicked, as movies can exist
	// in multiple rows, Row is listening for changes.
	sendBackID: function (e) {
		e.preventDefault();
		ApiUtil.fetchAdvert(this.props.ad.id, this.props.rowID);
		this.setState({ hover: false, details: false });
		var selectedNode = $(e.currentTarget);

		if (this.props.show === this.props.ad.id) {
			$(".selected").removeClass("selected");
			selectedNode.addClass("selected");
		} else {
			$(".selected").removeClass("selected");
			this.timedSelection = window.setTimeout(function(){
				selectedNode.addClass("selected");
				this.timedSelection = undefined;
			}.bind(this), 350);
		}
	},

	mouseIn: function (e) {
		if (this.state.hover || this.props.show) return;
		this.props.itemHover(this.props.idx, true);
		this.setState({ hover: true });
	},

	mouseOut: function (e) {
		if (!this.state.hover || this.props.show) return;
		this.props.itemHover(this.props.idx, false);

		if (this.state.details) {
			// remove class immediately to prioritize it over setState
			$(e.target.children[0]).removeClass("acc-hide");
			this.setState({ hover: false, details: false });
		} else {
			this.setState({ hover: false });
		}
	},

	playAd: function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.context.router.push({
			pathname: "/streaming",
			query: {
        title: this.props.ad.title,
			 	youtube: this.props.ad.youtube
      }
		});
	},

	render: function() {
		var details = this.state.details && !this.props.show ? "" : " acc-hide";
		var playbtn = this.state.details || this.props.show ? "" : " acc-hide";
		var hover = this.state.hover && !this.props.show ? " img-effect" : "";
		return (
			<div id={this.props.ad.id + "-" + this.props.rowID}
				className={"flix" + hover}
				onClick={this.sendBackID}
				onMouseEnter={this.mouseIn}
				onMouseLeave={this.mouseOut}
				style={{backgroundImage:"url(" + this.props.ad.thumbUrl + ")"}}>

				<container className={"advert-detail" + playbtn}>
					<section className="advert-play">
						<div className="advert-play-img"
							onClick={this.playAd}/>
					</section>

					<section className={"advert-modal" + details}>
						<strong className="advert-modal-header">
							{ this.props.ad.title }
						</strong>
						<div className="advert-modal-details">
							<Stars ad={this.props.ad}/>
							<p>{ this.props.ad.year }</p>
						</div>
						<div className="advert-modal-desc">
							<p>{ this.props.ad.description.substring(0,107) }...</p>
							<div><MyButton small={true} ad={this.props.ad}/></div>
						</div>
						<div className="advert-show-detail-btn"
							onClick={this.sendBackID}/>
					</section>

				</container>
			</div>
		);
	}

});

module.exports = Advert;
