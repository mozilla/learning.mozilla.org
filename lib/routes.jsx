var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var ga = require('react-ga');
var Page = require('../components/page.jsx');

var GA_ACCOUNT = process.env.GA_ACCOUNT || 'UA-49796218-20';
var GA_DEBUG = process.env.GA_DEBUG || 'off';
var urls = [];

var routes = (
  <Route handler={Page}>
    <Route name="join" path="/join/"
     handler={require('../pages/join.jsx')}/>
    <Route name="about" path="/about/"
     handler={require('../pages/about.jsx')}/>
    <Route name="activities" path="/activities/"
     handler={require('../pages/activities.jsx')}/>
    <Route name="web-literacy" path="/teach-like-mozilla/web-literacy/"
     handler={require('../pages/web-literacy.jsx')}/>
    <Route name="events" path="/events/"
     handler={require('../pages/events.jsx')}/>
    <Route name="event-resources" path="/events/resources/"
     handler={require('../pages/event-resources.jsx')}/>
    <Route name="mozilla-web-clubs" path="/mozilla-web-clubs/"
     handler={require('../pages/clubs.jsx')}/>
    <Route name="clubs-curriculum" path="/clubs/curriculum/"
     handler={require('../pages/clubs-curriculum.jsx')}/>
    <Route name="clubs-toolkit" path="/clubs/toolkit/"
     handler={require('../pages/clubs-toolkit.jsx')}/>
    <Route name="teach-like-mozilla" path="/teach-like-mozilla/"
     handler={require('../pages/teach-like-mozilla.jsx')}/>
    <Route name="fixme" path="/fixme/"
     handler={require('../pages/fixme.jsx')}/>
    <DefaultRoute name="home"
     handler={require('../pages/home.jsx')}/>
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
  var options = {};
  if (GA_DEBUG === 'on') {
    options.debug = true;
  }
  ga.initialize(GA_ACCOUNT, options);
  Router.run(routes, location, function(Handler, state) {
    ga.pageview(state.pathname);
    React.render(<Handler/>, el);
  });
};
