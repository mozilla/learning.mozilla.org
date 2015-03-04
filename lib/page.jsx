var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <div className="page container-fluid">
        <div className="row">
          <Sidebar/>
          <div className="content col-md-9">
            <RouteHandler/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Page;
