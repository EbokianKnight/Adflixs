var React = require('react');
var PropTypes = React.PropTypes;

var NotFound = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },
  
  home: function () {
    this.context.router.push('/')
  },

  render: function() {
    return (
      <div className="not-found-body">
        <src className="mammoth" onClick={this.home}/>
        <p className="not-found-message test">404 Page Not Found</p>
        <copy className="copyright">EbokianGames
          © 2002-2016</copy>
      </div>
    );
  }

});

module.exports = NotFound;
