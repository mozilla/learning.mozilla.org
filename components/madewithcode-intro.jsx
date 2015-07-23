var React = require('react');
var ImageTag = require('../components/imagetag.jsx');

var config = require('../lib/config');

var MadeWithCodeIntro = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    learnCSS: React.PropTypes.bool
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-9 col-lg-9">
          <p>
            <strong>Congratulations on your new <a href={config.MADE_WITH_CODE}>Made with Code</a> skills! </strong>
            { this.props.learnCSS ?
                <span>Now let’s learn a little <em>HTML</em> and <em>CSS</em>, the official languages of the web.</span>
              : <span>Now let’s learn a little <em>HTML</em>, the official language of the web.</span>
            }
          </p>
          <h2>{this.props.title}</h2>
          {this.props.introText}
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3">
          <a href={config.MADE_WITH_CODE}>
            <ImageTag src1x="/img/pages/madewithcode/logo_mwc.png"
                    src2x="/img/pages/madewithcode/logo_mwc.png"
                    alt=""
                    width={200} />
          </a>
        </div>
      </div>
    );
  }
});

module.exports = MadeWithCodeIntro;
