var React = require('react');
var moment = require('moment');

var LatestPosts = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <ul className="recent-posts">
        {
          this.props.posts.map(function(post, i) {
            return (
              <li key={i}>
                <a className="post-title" href={post.link}>{post.title}</a>
                <time className="published" dateTime={post.publishedDate}>
                  <span>{moment(new Date(post.publishedDate)).format("MMM D, YYYY")}</span>
                </time>
              </li>
            );
          })
        }
      </ul>
    );
  }
});

module.exports = LatestPosts;
