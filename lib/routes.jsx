var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var ga = require('./googleanalytics.js');
var Page = require('../components/page.jsx');

var urls = [];

var routes = (
  <Route handler={Page}>
    <Route name="join" path="/join/"
     handler={require('../components/join-page.jsx')}/>
    <Route name="about" path="/about/"
     handler={require('../components/about-page.jsx')}/>
    <Route name="activities" path="/activities/"
     handler={require('../components/activities-page.jsx')}/>
    <Route name="events" path="/events/"
     handler={require('../components/events-page.jsx')}/>
    <Route name="clubs" path="/clubs/"
     handler={require('../components/clubs-page.jsx')}/>
    <Route name="teach-like-mozilla" path="/teach-like-mozilla/"
     handler={require('../components/teach-like-mozilla-page.jsx')}/>
     <Route name="fixme" path="/fixme/"
     handler={require('../components/fixme-page.jsx')}/>
    <DefaultRoute name="home"
     handler={require('../components/home-page.jsx')}/>
  </Route>
);

// TODO: come up with a better solution for nested route if we will ever have that.
React.Children.forEach(routes.props.children, function(item) {
  urls.push(item.props.path || '/');
});

exports.URLS = urls;

exports.routes = routes;

exports.generateStatic = function(url, cb) {
  Router.run(routes, url, function(Handler) {
    cb(React.renderToString(<Handler/>));
  });
};

exports.run = function(location, el) {
  ga.initialize();
  Router.run(routes, location, function(Handler, state) {
    ga.pageview(state.pathname);
    React.render(<Handler/>, el);
  });
};
