var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var Homepage = require('./homepage.jsx');
var urls = [];

function placeholderPage(options) {
  return React.createClass({
    statics: {
      pageClassName: options.pageClassName
    },
    render: function() {
      return (
        <div>
          <HeroUnit image="/img/hero-unit.jpg">
            <h1>Placeholder: {options.title}</h1>
          </HeroUnit>
          <h2>This is a placeholder page for &ldquo;{options.title}&rdquo;.</h2>
          {options.githubIssue
           ? <p>Discussion about this page can be found on GitHub at <a
               href={"https://github.com/mozilla/teach.webmaker.org/issues/" +
                     options.githubIssue}>
                 <code style={{
                   color: '#1F93D0',
                   backgroundColor: '#f0f0f0'
                 }}>mozilla/teach.webmaker.org#{options.githubIssue}</code>
               </a>.
             </p>
           : null}
        </div>
      );
    }
  })
}

var routes = (
  <Route handler={Page}>
    <Route name="/join/" handler={placeholderPage({
      title: 'Join Us',
      githubIssue: 154
    })}/>
    <Route name="/activities/" handler={placeholderPage({
      title: 'Teaching Activities',
      pageClassName: 'teaching-materials',
      githubIssue: 36
    })}/>
    <Route name="/events/" handler={placeholderPage({
      title: 'Events',
      githubIssue: 35
    })}/>
    <Route name="/clubs/" handler={placeholderPage({
      title: 'Clubs',
      githubIssue: 44
    })}/>
    <Route name="/teach-like-mozilla/" handler={placeholderPage({
      title: 'Teach Like Mozilla',
      pageClassName: 'teaching-materials',
      githubIssue: 37
    })}/>
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
