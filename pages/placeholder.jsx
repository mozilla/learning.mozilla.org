var React = require('react');

var HeroUnit = require('../components/hero-unit.jsx');

var PlaceholderPage = React.createClass({
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>Placeholder: {this.props.title}</h1>
        </HeroUnit>
        <h2>This is a placeholder page for &ldquo;{this.props.title}&rdquo;.</h2>
        {this.props.githubIssue
         ? <p>Discussion about this page can be found on GitHub at <a
             href={"https://github.com/mozilla/teach.mozilla.org/issues/" +
                   this.props.githubIssue}>
               <code style={{
                 color: '#1F93D0',
                 backgroundColor: '#f0f0f0'
               }}>mozilla/teach.mozilla.org#{this.props.githubIssue}</code>
             </a>.
           </p>
         : null}
         {this.props.children}
      </div>
    );
  }
});

module.exports = PlaceholderPage;
