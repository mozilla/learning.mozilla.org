var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;
var IndexRoute  = ReactRouter.IndexRoute;

/**
 * Our base routes
 */
var pages = {
  'about': require('../pages/about.jsx'),
  'activities': require('../pages/activities.jsx'),
  'activities/intermediate-web-lit': require('../pages/intermediate-web-lit.jsx'),
  'activities/madewithcode': require('../pages/madewithcode.jsx'),
  'activities/madewithcode-firstwebpage': require('../pages/madewithcode-firstwebpage.jsx'),
  'activities/madewithcode-meme': require('../pages/madewithcode-meme.jsx'),
  'activities/madewithcode-poster': require('../pages/madewithcode-poster.jsx'),
  'activities/maker-party-2015': require('../pages/maker-party-2015.jsx'),
  'activities/parapara': require('../pages/parapara.jsx'),
  'activities/protect-your-data': require('../pages/protect-your-data.jsx'),
  'activities/privacy-basics': require('../pages/privacy-basics.jsx'),
  'activities/web-lit-basics': require('../pages/web-lit-basics.jsx'),
  'activities/web-lit-basics-two': require('../pages/web-lit-basics-two.jsx'),
  'activities/web-literacy': require('../pages/web-literacy.jsx'),
  'activities/webmaker': require('../pages/webmaker.jsx'),
  'activities/back-to-school-write-the-web': require('../pages/back-to-school-write-the-web.jsx'),
  'clubs': require('../pages/clubs.jsx'),
  'clubs/list': require('../pages/clubs-list.jsx'),
  'community': require('../pages/community.jsx'),
  'community/curriculum-workshop': require('../pages/curriculum-workshop.jsx'),
  'community/community-call': require('../pages/community-call.jsx'),
  'events': require('../pages/events.jsx'),
  'events/resources': require('../pages/event-resources.jsx'),
  'fixme': require('../pages/fixme.jsx'),
  'healthcheck': require('../pages/healthcheck.jsx'),
  'home': require('../pages/home.jsx'),
  'opportunities': require('../pages/opportunities.jsx'),
  'tools': require('../pages/tools.jsx'),
  'me': require('../pages/makes.jsx')
};

/**
 * Redirects from old URLs to new URLs
 */
var redirects = {
  'clubs/curriculum': 'activities/web-lit-basics',
  'teach-like-mozilla/web-literacy': 'activities/web-literacy'
};

// aggregate all paths used in the app
var urls = ['/'];
urls = urls.concat( Object.keys(pages)     );
urls = urls.concat( Object.keys(redirects) );
// remove duplicates. Just in case.
urls = urls.filter(function(e,i) { return urls.indexOf(e)===i; });

// <Route> elements
var routeElements = Object.keys(pages).map(function(path) {
  return <Route path={path} component={pages[path]} key={path}/>;
});

// <Redirect> elements
var redirectElements = Object.keys(redirects).map(function(path) {
  return <Redirect from={path} to={redirects[path]} key={path} />;
});

// routes below are listed alphabetically by their path
// ---
// Since WordPress page slug is arbitrary, <Route path=":wpSlug"> is added last. 
// This is basically a catch-all pattern that allows us to grab requested path and pass it 
// as the WP page slug in a WP API call. If WP sends back 200, we display the content.
// Else error message will be shown on the page. Note that the API call is made on client side.
var routes = (
  <Route path='/' component={require('../components/page.jsx')} >
    <IndexRoute component={require('../pages/home.jsx')} />
    {routeElements}
    {redirectElements}
    <Route path=":wpSlug" component={require('../pages/wp-content.jsx')}/>
  </Route>
);

// return all the route information
module.exports = {
  URLS: urls,
  REDIRECTS: redirects,
  routes: routes
};
