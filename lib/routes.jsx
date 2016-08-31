var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;
var IndexRoute = ReactRouter.IndexRoute;
var locales = Object.keys(require('../dist/locales.json'));


// verify we have at least one locale
if (Object.keys(locales).length === 0) {
  console.error("No locales were loaded into routes.jsx, no routes can be built!");
  process.exit(1);
}


/**
 * Our base routes
 */
var pages = {
  'activities': require('../pages/activities.jsx'),
  'activities/next-prez': require('../pages/next-prez.jsx'),
  'activities/intermediate-web-lit': require('../pages/intermediate-web-lit.jsx'),
  'activities/intermediate-web-lit-two': require('../pages/intermediate-web-lit-two.jsx'),
  'activities/madewithcode': require('../pages/madewithcode.jsx'),
  'activities/madewithcode-firstwebpage': require('../pages/madewithcode-firstwebpage.jsx'),
  'activities/madewithcode-meme': require('../pages/madewithcode-meme.jsx'),
  'activities/madewithcode-poster': require('../pages/madewithcode-poster.jsx'),
  'activities/maker-party-2015': require('../pages/maker-party-2015.jsx'),
  'activities/offline-icebreakers': require('../pages/offline-icebreakers.jsx'),
  'activities/parapara': require('../pages/parapara.jsx'),
  'activities/protect-your-data': require('../pages/protect-your-data.jsx'),
  'activities/privacy-basics': require('../pages/privacy-basics.jsx'),
  'activities/web-lit-basics': require('../pages/web-lit-basics.jsx'),
  'activities/web-lit-basics-two': require('../pages/web-lit-basics-two.jsx'),
  'activities/webmaker': require('../pages/webmaker.jsx'),
  'activities/back-to-school-write-the-web': require('../pages/back-to-school-write-the-web.jsx'),
  'clubs': require('../pages/clubs/index.jsx'),
  'clubs/list': require('../pages/clubs-list.jsx'),
  // NOTE: 'codemoji' is reserved. See https://github.com/mozilla/learning.mozilla.org/issues/1798
  'community': require('../pages/community.jsx'),
  'community/curriculum-workshop': require('../pages/curriculum-workshop.jsx'),
  'community/curriculum-workshop/march-8-2016': require('../pages/curriculum-workshop-march-8-2016.jsx'),
  'community/curriculum-workshop/april-12-2016': require('../pages/curriculum-workshop-april-12-2016.jsx'),
  'community/curriculum-workshop/may-10-2016': require('../pages/curriculum-workshop-may-10-2016.jsx'),
  'community/curriculum-workshop/june-16-2016': require('../pages/curriculum-workshop-june-16-2016.jsx'),
  'community/curriculum-workshop/july-12-2016': require('../pages/curriculum-workshop-july-12-2016.jsx'),
  'community/community-call': require('../pages/community-call.jsx'),
  'community/community-call/march-23-2016': require('../pages/community-call-march-23.jsx'),
  'community/community-call/april-20-2016': require('../pages/community-call-april-20.jsx'),
  'community/community-call/may-25-2016': require('../pages/community-call-may-25.jsx'),
  'community/community-call/june-29-2016': require('../pages/community-call-june-29.jsx'),
  'community/community-call/july-28-2016': require('../pages/community-call-july-28.jsx'),
  // NOTE: 'encryption' is reserved. See https://github.com/mozilla/learning.mozilla.org/issues/1798
  'events': require('../pages/events.jsx'),
  'events/resources': require('../pages/event-resources.jsx'),
  'fixme': require('../pages/fixme.jsx'),
  'healthcheck': require('../pages/healthcheck.jsx'),
  'home': require('../pages/home.jsx'),
  'opportunities': require('../pages/opportunities.jsx'),
  'tools': require('../pages/tools.jsx'),
  'me': require('../pages/makes.jsx'),
  'web-literacy/skills': require('../pages/web-literacy/Skills.jsx')
};

// FEATURE FLAG:
// badges are behind a feature flag until finalized
if (process.env.ENABLE_BADGES) {
  var objectAssign = require('object-assign');

  pages = objectAssign(pages, {
    'badges': require('../pages/badges/badges.jsx'),
    'badge/:id': require('../pages/badges/badge-single.jsx'),
    'badge/:id/:slug': require('../pages/badges/badge-single.jsx')
  });
}

/**
 * Redirects from old URLs to new URLs
 */
var redirects = {
  'clubs/curriculum': 'activities/web-lit-basics',
  'teach-like-mozilla/web-literacy': 'web-literacy',
  'activities/web-literacy': 'web-literacy'
};

// aggregate all paths used in the app
var urls = ['/'];

urls = urls.concat([
  'web-literacy',
  'web-literacy/participate',
  'web-literacy/participate/connect',
  'web-literacy/participate/protect',
  'web-literacy/participate/open-practice',
  'web-literacy/participate/contribute',
  'web-literacy/participate/share',
  'web-literacy/write',
  'web-literacy/write/design',
  'web-literacy/write/code',
  'web-literacy/write/compose',
  'web-literacy/write/revise',
  'web-literacy/write/remix',
  'web-literacy/read',
  'web-literacy/read/search',
  'web-literacy/read/navigate',
  'web-literacy/read/synthesize',
  'web-literacy/read/evaluate'
]);

urls = urls.concat(Object.keys(pages));
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
// [NOTE] add <Route path=":wpSlug" component={require('../pages/wp-content.jsx')}/> back
//        when we are ready to expose "WP pages" on production
function buildRoutes() {
  var routes = [];
  var localeURLs = [];

  locales.forEach(function(locale) {
    routes.push(
      <Route key={locale} path={locale} component={require('../components/page.jsx')}>
        <IndexRoute component={require('../pages/home.jsx')} />
        {routeElements}
        {redirectElements}
        <Route path="web-literacy" component={require('../pages/web-literacy.jsx')}>
          <Route path=":verb" component={require('../pages/web-literacy.jsx')}>
            <Route path=":webLitSkill" component={require('../pages/web-literacy.jsx')}/>
          </Route>
        </Route>
      </Route>
      );

    // Add each locale's routes to the array of urls that the server uses for route matching
    urls.forEach(function(key) {
      var newkey = locale + "/" + key;

      localeURLs.push(newkey);
    });

  });

  return {
    routes: routes,
    urls: localeURLs
  };
}

var builtRoutes = buildRoutes();

// return all the route information
module.exports = {
  URLS: builtRoutes.urls,
  REDIRECTS: redirects,
  routes: builtRoutes.routes
};
