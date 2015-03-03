var React = require('react');

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <div className={"page container-fluid " +
                      (this.props.className || '')}>
        <div className="row">
          <Sidebar/>
          <div className="content col-md-9">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Page;
