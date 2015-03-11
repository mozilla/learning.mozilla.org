var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');

var Page = React.createClass({
  mixins: [Router.State],
  render: function() {
    var pageClassName = this.getRoutes()[1].handler.pageClassName || '';
    return (
      <div className={"page container-fluid " + pageClassName}>
        <div className="row">
          <Sidebar/>
          <main className="content col-md-9">
            <RouteHandler/>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Page;
