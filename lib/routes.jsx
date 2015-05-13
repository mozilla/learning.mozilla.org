var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var ga = require('react-ga');
var Page = require('../components/page.jsx');

var urls = [];

var routes = (
  <Route handler={Page}>
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
    <Route name="mozilla-clubs" path="/clubs/"
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
  var router = Router.create({
    routes: routes,
    location: url
  });
  router.run(function(Handler) {
    var pageHandler = Page.handlerForPage(router, url);

    cb(React.renderToString(<Handler/>), {
      title: Page.titleForHandler(pageHandler)
    });
  });
};

exports.run = function(location, el) {
  Router.run(routes, location, function(Handler, state) {
    ga.pageview(state.pathname);
    React.render(<Handler/>, el);
  });
};
