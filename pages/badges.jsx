var React = require('react'),
    HeroUnit = require('../components/hero-unit.jsx'),
    IconLinks = require('../components/icon-links.jsx'),
    IconLink = require('../components/icon-link.jsx'),
    BadgeVerticalIcon = require('../components/badge-vertical-icon.jsx'),
    urlize = require('urlize').urlize,
    Link = require('react-router').Link,
    BadgesAPI = require('../lib/badges-api'),
    TeachAPI = require('../lib/teach-api');

var BadgesPage = React.createClass({
    statics: {
        pageTitle: 'Badges',
        pageClassName: 'badges'
    },
    setBadgesData: function (data) {
        var parsed = this.parseBadges(data);
        this.setState({
            badges: parsed
        });
    },
    getInitialState: function() {
        return {
            'badges' : [],
            'teachAPI' : this.props.teachAPI || new TeachAPI()
        };
    },
    componentDidMount: function () {
        var BadgesInterface = new BadgesAPI();
        var _this = this;
        BadgesInterface.listBadges(function (err, resp) {
            if (err) {
                //console.log('Error in fetch badges');
            } else {
                _this.setBadgesData(resp);
            }
        });
    },
    parseBadges: function (response) {
        // do parsing here
        var data = [];

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
    render: function () {
        var linkUrl = "",
            badgesView = '',
            isLoggedIn = !!this.state.teachAPI.getUsername(),
            loginComponent = "";

        if (!isLoggedIn) {
            loginComponent = (
                <div className="login-section">
                    <div>
                        <img src="/img/pages/badges/svg/divider.svg" width={'90%'}
                             className="center-block horizontal-divider"/>
                    </div>
                    <div className={'text-center login-cta'}>
                        <span className={'login-text'}>Sign in to start earning credentials.</span>
                        <a href="/login" className="btn btn-awsm">Sign In</a>
                    </div>
                    <div>
                        <img src="/img/pages/badges/svg/divider.svg" width={'90%'} alt=""
                             className="center-block horizontal-divider"/>
                    </div>
                </div>
            );
        }



        if (this.state) {
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
        }

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

                {loginComponent}

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
