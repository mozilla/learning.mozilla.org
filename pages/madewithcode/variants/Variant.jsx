var React = require('react');

var SampleMake = require('../../../components/madewithcode-sample-make.jsx');
var MadeWithCodeIntro = require('../../../components/madewithcode-intro.jsx');
var Instructions = require('../../../components/madewithcode-instructions.jsx');

module.exports = function(options) {
  return React.createClass({
    statics: options.statics,
    render: function() {
      return (
        <div>
          <div className="inner-container">
            <section>
              <MadeWithCodeIntro title={options.title} introText={options.introText} />
            </section>

            <section>
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <SampleMake {...options.sampleMake} remixUrl={options.remixUrl} />
                </div>

                <div className="col-sm-8 col-md-8 col-lg-8">
                  <Instructions
                    remixUrl={options.remixUrl}
                    step1={options.steps[0]}
                    step2={options.steps[1]}
                    nextActivityTitle={options.nextTitle}
                    nextActivityLinkName={options.linkName}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
  });
};
