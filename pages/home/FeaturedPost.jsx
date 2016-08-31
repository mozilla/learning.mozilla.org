var React = require('react');
var moment = require('moment');
var FormattedMessage = require('react-intl').FormattedMessage;

var FeaturedPost = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    publishedDate: React.PropTypes.string.isRequired,
    contentSnippet: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  },
  render: function() {
    var parsedMomentDate = this.props.publishedDate ? moment(new Date(this.props.publishedDate)) : null;

    return(
      <div className="featured-post">
        { parsedMomentDate ?
          // shows this section only when featured post data has been loaded
          <div>
            <div className="entry-posted-container">
              <p className="entry-posted">
                <time className="published" dateTime={this.props.publishedDate} >
                  <span className="posted-month">{parsedMomentDate.format("MMM")}</span>
                  <span className="posted-date">{parsedMomentDate.format("D")}</span>
                  <span className="posted-year">{parsedMomentDate.format("YYYY")}</span>
                </time>
              </p>
            </div>
            <div className="entry-header-container">
              <h3 className="entry-title"><a href={this.props.link}>{this.props.title}</a></h3>
              <cite className="author">{this.props.author}</cite>
            </div>
            <p className="excerpt">
              {this.props.contentSnippet}
            </p>
            <a className="more" href={this.props.link}><FormattedMessage id="continue_reading" /></a>
          </div>
          : null
        }
      </div>
    );
  },
});

module.exports = FeaturedPost;
