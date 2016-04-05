var React = require('react');
var NavBar = require('./ads/nav_bar');
var Footer = require('./ads/main_footer.jsx');

var MainPage = React.createClass({

  componentDidMount: function() {
    document.body.style.backgroundColor = "#141414";
  },

  componentWillUnmount: function() {
    document.body.style.backgroundColor = "#141414";
  },

  render: function() {
    return (
      <div>
        <NavBar />
				<spacer className="main-nav-background"></spacer>
          {this.props.children}
        <Footer />
      </div>
    );
  }

});

module.exports = MainPage;
