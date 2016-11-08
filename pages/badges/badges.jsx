var React = require('react'),
    urlize = require('urlize').urlize,
    Link = require('react-router').Link,
    HeroUnit = require('../../components/hero-unit.jsx'),
    IconLinks = require('../../components/icon-links.jsx'),
    IconLink = require('../../components/icon-link.jsx'),
    Illustration = require('../../components/illustration.jsx'),
    BadgeVerticalIcon = require('../../components/badges/badge-vertical-icon.jsx'),
    LoginLink = require('../../components/login/LoginLink.jsx'),
    Divider = require('../../components/Divider.jsx'),
    BadgesAPI = require('../../lib/badges-api'),
    TeachAPI = require('../../lib/teach-api');

var BadgesPage = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },

  statics: {
    pageTitle: 'Badges',
    pageClassName: 'badges'
  },

  getInitialState: function() {
    return {
      hasAccess: false,
      badges: [],
      teachAPI: this.props.teachAPI || new TeachAPI(),
      badgeAPI: false
    };
  },

  toggleAccess: function(err, result) {
    result = result || { access: false };
    this.setState({
      hasAccess: result.access
    });
  },

  componentDidMount: function () {
    var badgeAPI = new BadgesAPI({ teachAPI: this.state.teachAPI });

    this.setState({ badgeAPI: badgeAPI });

    // steo 1: retrieve the list of all available MLN badges
    badgeAPI.listBadges(this.setBadgesData);

    // we're also interested in whether this user is credly-authenticated
    badgeAPI.hasAccess(this.toggleAccess, function(err, data) {
      if (err) {
        return console.error("not logged into credly");
      }
    });
  },

  setBadgesData: function (err, data) {
    this.setState({
      badges: this.parseBadges(err, data)
    });
  },

  parseBadges: function (err, response) {
    // do parsing here
    var data = [];
    var earned = response.earned || [];
    var pending = response.pending || [];
    var noUser = (this.state.teachAPI.getLoginInfo() === null);

    if (err) {
      console.error(err);
      return data;
    }

    data = response.badges.map(function (badge) {
      var interpreted = {
        'title': badge.title,
        'description': badge.short_description || '',
        'icon': badge.image_url,
        'icon2x': badge.image_url,
        'id': badge.id,
      };

      // order matters: 'earned' also contains pending-badges due to how Credly works.
      if (noUser) {
        interpreted.status = false;
      } else if (pending.indexOf(badge.id) !== -1) {
        interpreted.status = "pending";
      } else if (earned.indexOf(badge.id) !== -1) {
        interpreted.status = "achieved";
      } else {
        interpreted.status = "eligible";
      }

      return interpreted;
    });

    return data;
  },

  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Credentials</h1>
          <p className="text-center sub-title">Earn credentials to demonstrate you have the skills<wbr/> to teach the web.</p>
        </HeroUnit>

        <section>
          <div className="about-credentials">
            <Illustration
              height={200} width={200}
              src1x="/img/pages/badges/svg/icon-badgeintro.svg"
              alt="">
                <p>
                  Explore core web literacy and 21st Century skills badges, apply for
                  these badges, and share with others the skills you have learned.
                </p>
            </Illustration>
          </div>
        </section>

        <Divider className="badges"/>

        { this.formLoginBlock() }

        <div className="inner-container badges-content">
          <section>
            <h2 className="text-center">Earn Web Literacy and 21st Century Skills Badges</h2>

            <p className="text-center">Certain skills are critical to becoming a citizen of
            the web. Hone these core web literacy and 21st Century skills and earn badges
            that spotlight your expertise.</p>

            <div className="sep-16"></div>
            <div className="row">
            { this.generateBadgeList() }
            </div>
          </section>
        </div>
      </div>
    );
  },

  formLoginBlock: function() {
    if (this.state.teachAPI.getLoginInfo() !== null) {
      return null;
    }

    return (
      <div className="signinblock">

        <div className={'text-center login-cta'}>
          <span className={'login-text'}>Sign in to start earning credentials.</span>
          <LoginLink className="btn btn-awsm" loginBaseURL={this.state.teachAPI.baseURL} callbackURL={this.props.currentPath}>Sign in</LoginLink>
        </div>

        <Divider className="badges"/>
      </div>
    );
  },

  generateBadgeList: function() {
    var self = this;
    var anonymous = !this.state.teachAPI.getLoginInfo();

    if (this.state.badges.length === 0) {
      return (
        <div>
          <Divider/>
          <div style={{textAlign: 'center'}}>Loading badges...</div>
        </div>
      );
    }

    return this.state.badges.map(function (badge) {
      var linkUrl = '/badge/' + badge.id + '/' + urlize(badge.title);

      return (
        <div key={badge.id} className="col-md-3">
          <Link to={ "/" + self.context.intl.locale + linkUrl } className={'badge-icon-link'}>
            <BadgeVerticalIcon badge={badge} anonymous={anonymous} />
          </Link>
        </div>
      );
    });
  }
});

module.exports = BadgesPage;
