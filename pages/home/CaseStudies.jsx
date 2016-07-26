var React = require('react');
var Blockquote = require('../../components/blockquote.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;

var CaseStudies = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="row">
          <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
            <div>
              <Blockquote author={this.context.intl.formatMessage({id: "case_study_author"})}
                  imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png">
                <p>"<FormattedMessage id="case_study_message" />"</p>
              </Blockquote>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = CaseStudies;
