var React = require('react');

var Divider = React.createClass({

	render: function() {
		return (
      <div className="divider">
  			<hr className="line"/>
        <span className="diamond"/>
      </div>
		);
	}

});

module.exports = Divider;