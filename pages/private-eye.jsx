var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ImageTag = require('../components/imagetag.jsx');
var Instructions = require('../components/madewithcode-instructions.jsx');

var config = require('../config/config');

var Lightbeam = (
  <div className="install-lightbeam">
    <ImageTag src1x="/img/pages/private-eye/svg/logo-lightbeam.svg"
              alt=""
              width={150}
              className="lightbeam-logo" />
    <a className="makerstrap-btn makerstrap-btn-primary" href="https://addons.mozilla.org/firefox/downloads/latest/363974/addon-363974-latest.xpi">Install Firefox Lightbeam</a>
    <div className="note">
      <ImageTag src1x="/img/pages/private-eye/svg/logo-firefox.svg"
                alt=""
                width={60} />
      <p>Use the button above to install the Lightbeam add-on in your Firefox web browser.</p>
    </div>
  </div>
);

var StepsToInstall = (
  <div className="madewithcode-instructions">
    <h2>Let’s get started</h2>
    <ol>
      <li>
        <p><strong>Install the Firefox Lightbeam Add-on.</strong> Click on the Install Firefox Lightbeam button on the left. Then, click the Install Now button in the dialog that pops up.</p>
         <a href={config.LIGHT_BEAM_URL}>
          <ImageTag src1x="/img/pages/private-eye/img-Lightbeam-install.jpg" alt="" width={403} />
        </a>
      </li>
      <li>
        <p><strong>Go to five of your favorite websites.</strong> They could be Facebook, YouTube, Netflix, the New York Times, Amazon – anywhere.</p>
        <ImageTag src1x="/img/pages/private-eye/svg/img-privacy-websites.svg" alt="" width={500} />
      </li>
      <li>
        <p><strong>Now, click the Lightbeam icon in your toolbar.</strong> Take a look at the graph. It’s now filled with the sites you’ve visited, plus all the hidden third parties that track what you do on sites you visit. You may not have realized it, but you’ve just interacted with all those third party sites – in addition to the sites you actually meant to visit.</p>
         <ImageTag src1x="/img/pages/private-eye/svg/img-Lightbeam-interface.svg" alt="" width={403} />
          <p><strong><span className="bonus-point"><em>Bonus points: </em></span>Read up on Do Not Track.</strong> Companies are starting to support Do Not Track, but you may not notice any changes initially. Mozilla is working with companies that have started to implement Do Not Track. Find out more.</p>
      </li>
      <li>
        <p><strong>Take steps to protect yourself from unwanted tracking.</strong> On your Firefox browser, go to Preferences. Click on the Privacy panel. Set your Tracking preferences to ‘Tell sites that I do not want to be tracked.’</p>
         <ImageTag src1x="/img/pages/private-eye/.jpg" src2x="/img/pages/private-eye/.jpg" alt="" width={245} />
      </li>
    </ol>
    <h2>Nice work! Now you know more about protecting your privacy online.</h2>
  </div>
);

var PrivateEyePage = React.createClass({
  statics: {
    pageTitle: 'Private Eye',
    pageClassName: 'private-eye'
  },
  render: function() {
    return (
      <div>
        <div className="inner-container">
          <section>
            <h1>Private Eye: See who’s tracking you online</h1>
            <p>
              Create a “Wizard of Oz” moment by pulling back the curtain to see who’s watching you
              on the Web. Turn on Mozilla’s Lightbeam tool, visit a handful of websites to see who’s
              tracking you, and then learn how to fight back. You’ll never look at the Web the same way again!
            </p>
          </section>

          <section>
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                {Lightbeam}
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                {StepsToInstall}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = PrivateEyePage;
