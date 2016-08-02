var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var Link = require('react-router').Link;

var Instructions = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  propTypes: {
    remixUrl: React.PropTypes.string.isRequired,
    nextActivityTitle: React.PropTypes.string.isRequired,
    nextActivityLinkPath: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="madewithcode-instructions">
        <h2>Get started</h2>
        <ol>
          <li>
            {this.props.step1}
          </li>
          <li>
            {this.props.step2}
             <ImageTag src1x="/img/pages/madewithcode/graphic_thimble.png"
                      alt=""
                      width={245} />
          </li>
          <li>
            <p><strong>Done!</strong> Once you’re finished, you can save your work and share it. Log in and hit “Publish”.</p>
          </li>
        </ol>

        <h2>Go further</h2>
        <ul>
          <li>
            <p>Try the next Made with Code activity. Use your new HTML and CSS skills to <Link to={"/" + this.context.intl.locale + this.props.nextActivityLinkPath}>{this.props.nextActivityTitle}</Link>.</p>
          </li>
          <li>
            <p>The Mozilla Learning Network has lots of other free <Link to={"/" + this.context.intl.locale + "/activities"}>activities</Link> as well.</p>
          </li>
        </ul>

      </div>
    );
  }
});

module.exports = Instructions;
