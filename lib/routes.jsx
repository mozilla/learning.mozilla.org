var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var ga = require('./googleanalytics.js');
var placeholderPage = require('../pages/placeholder.jsx');
var Homepage = require('../pages/homepage.jsx');
var Page = require('../components/page.jsx');

var urls = [];

var routes = (
  <Route handler={Page}>
    <Route name="join" path="/join/" handler={placeholderPage({
      title: 'Join Us',
      githubIssue: 154
    })}/>
    <Route name="about" path="/about/" handler={placeholderPage({
      title: 'About',
      githubIssue: 99
    })}/>
    <Route name="activities" path="/activities/" handler={placeholderPage({
      title: 'Teaching Activities',
      pageClassName: 'teaching-materials',
      githubIssue: 36
    })}/>
    <Route name="events" path="/events/" handler={placeholderPage({
      title: 'Events',
      pageClassName: 'events',
      githubIssue: 35
    })}/>
    <Route name="clubs" path="/clubs/" handler={placeholderPage({
      title: 'Clubs',
      pageClassName: 'clubs',
      githubIssue: 44
    })}/>
    <Route name="teach-like-mozilla" path="/teach-like-mozilla/" handler={placeholderPage({
      title: 'Teach Like Mozilla',
      pageClassName: 'teach-like-mozilla',
      githubIssue: 37
    })}/>
    <DefaultRoute name="home" handler={Homepage}/>
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
