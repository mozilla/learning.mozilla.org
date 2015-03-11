var React = require('react');

var HeroUnit = require('./hero-unit.jsx');

var PlaceholderPage = React.createClass({
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/hero-unit.jpg">
          <h1>Placeholder: {this.props.title}</h1>
        </HeroUnit>
        <h2>This is a placeholder page for &ldquo;{this.props.title}&rdquo;.</h2>
        {this.props.githubIssue
         ? <p>Discussion about this page can be found on GitHub at <a
             href={"https://github.com/mozilla/teach.webmaker.org/issues/" +
                   this.props.githubIssue}>
               <code style={{
                 color: '#1F93D0',
                 backgroundColor: '#f0f0f0'
               }}>mozilla/teach.webmaker.org#{this.props.githubIssue}</code>
             </a>.
           </p>
         : null}
         {this.props.children}
      </div>
    );
  }
});

module.exports = PlaceholderPage;
