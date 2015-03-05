var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var Homepage = require('./homepage.jsx');
var urls = [];

var Foo = React.createClass({
  statics: {
    pageClassName: 'teaching-materials'
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="http://placekitten.com/g/1024/480">
          <h1>I am foo.</h1>
          <div><Link to="/" className="btn btn-awsm">Meow</Link></div>
        </HeroUnit>
        <h2>Content can go here.</h2>
      </div>
    );
  }
});

var routes = (
  <Route handler={Page}>
    <Route name="/foo/" handler={Foo}/>
    <DefaultRoute name="/" handler={Homepage}/>
  </Route>
);

// TODO: come up with a better solution for nested route if we will ever have that.
React.Children.forEach(routes.props.children, function(item) {
  urls.push(item.props.name);
});

exports.URLS = urls;

exports.generateStatic = function(url, cb) {
  Router.run(routes, url, function(Handler) {
    cb(React.renderToString(<Handler/>));
  });
};

exports.run = function(location, el) {
  Router.run(routes, location, function(Handler) {
    React.render(<Handler/>, el);
  });
};
