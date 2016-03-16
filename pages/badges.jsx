var React = require('react'),
  HeroUnit = require('../components/hero-unit.jsx'),
  IconLinks = require('../components/icon-links.jsx'),
  IconLink = require('../components/icon-link.jsx'),
  BadgeVerticalIcon = require('../components/badge-vertical-icon.jsx'),
  urlize = require('urlize').urlize,
  Link = require('react-router').Link,
  BadgesAPI = require('../lib/badges-api'),
  TeachAPI = require('../lib/teach-api'),
  LoginLink = require('../components/login/LoginLink.jsx'),
  Divider = require('../components/Divider.jsx');

var BadgesPage = React.createClass({
  statics: {
    pageTitle: 'Badges',
    pageClassName: 'badges'
  },
  getInitialState: function() {
    return {
      'badges' : [],
      'teachAPI' : this.props.teachAPI || new TeachAPI()
    };
  },
  componentDidMount: function () {
    var BadgesInterface = new BadgesAPI();
    BadgesInterface.listBadges(this.setBadgesData);
  },
  setBadgesData: function (err, data) {
    this.setState({
      badges: this.parseBadges(err, data)
    });
  },
  parseBadges: function (err, response) {
    // do parsing here
    var data = [];

    if (err) {
      console.error(err);
      return data;
    }

    if (response.status === 200 && response.body && response.body.data && response.body.data.length) {
      data = Array.from(response.body.data).map(function (badgeData) {
        return {
          'title': badgeData.title || '',
          'status': 'Achieved',
          'description': badgeData.short_description || '',
          'icon': badgeData.image_url || '',
          'icon2x': badgeData.image_url || '',
          'id': badgeData.id,
        };
      });
    }

    return data;
  },
  formLoginBlock: function() {
    if (this.state.teachAPI.getUsername()) return null;
 
    return (
      <div className="signinblock" style={{ marginTop: '4em' }}>
        <Divider className="badges"/>

        <div className={'text-center login-cta'}>
          <span className={'login-text'}>Sign in to start earning credentials.</span>
          <LoginLink className="btn btn-awsm" loginBaseURL={this.state.teachAPI.baseURL} callbackURL={this.props.currentPath}>Sign in</LoginLink>
        </div>

        <Divider className="badges"/>
      </div>
    );
  },
  render: function () {
    var linkUrl = "",
      badgesView = '',
      loginComponent = "";

    // TODO:FIXME: make conditional on whether or not a user is logged in

    var badgesView = this.state.badges.map(function (badge) {
      linkUrl = '/badge/' + badge.id + '/' + urlize(badge.title);
      return (
        <div key={badge.id} className="col-md-4">
          <Link to={ linkUrl } className={'badge-icon-link'}>
            <BadgeVerticalIcon
              id={badge.id}
              icon={badge.icon}
              icon2x={badge.icon2x}
              title={badge.title}
              status={badge.status}
              alt={badge.title}
              description={badge.description}/>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <HeroUnit>
          <h1>Credentials</h1>

          <p className="text-center sub-title">Earn credentials to demonstrate you have the skills to teach
            the web.</p>
          <section>
            <IconLinks>
              <IconLink
                link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
                imgSrc="/img/pages/badges/svg/icon-explore.svg"
                head="Explore"
                subhead="See all badges we offer and which ones you qualify for."
              />
              <IconLink
                link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
                imgSrc="/img/pages/badges/svg/icon-earn.svg"
                head="Earn"
                subhead="Apply for badges by sharing your experiences."
              />
              <IconLink
                link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
                imgSrc="/img/pages/badges/svg/icon-share.svg"
                head="Share"
                subhead="Show your employers and friends you have the skills."
              />
            </IconLinks>
          </section>
        </HeroUnit>

        { this.formLoginBlock() }

        <div className="inner-container badges-content">
          <section>
            <h2 className="text-center">Earn 21st Century Skill Credentials</h2>

            <p className="text-center">Certain skills are critical to becoming a citizen of the web — like
              the ability to communicate, collaborate and create online. Hone these skills and earn badges
              that spotlight your expertise.</p>

            <div className="sep-16"></div>
            <div className="row">
              { badgesView }
            </div>
          </section>
        </div>
      </div>
    );
  }
});
module.exports = BadgesPage;
