var React = require('react'),
    ImageTag = require('../components/imagetag.jsx'),
    HeroUnit = require('../components/hero-unit.jsx'),
    IconLinks = require('../components/icon-links.jsx'),
    IconLink = require('../components/icon-link.jsx'),
    BadgeVerticalIcon = require('../components/badge-vertical-icon.jsx'),
    Link = require('react-router').Link,
    _ = require('underscore');

var BadgesPage = React.createClass({
    statics: {
        pageTitle: 'Badges',
        pageClassName: 'badges'
    },
    getInitialState: function () {
        var dummyBadges = [
            {
                key : 1,
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            },
            {
                key: 2,
                title: 'Collaboration',
                status: 'pending',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Collaborative.png',
                icon2x: '/img/components/badge-icon/Collaborative@2x.png'
            },
            {
                key: 3,
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                key: 4,
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                key: 5,
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            },
            {
                key: 6,
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                key: 7,
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                key: 8,
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            }
        ];

        return {
            badges: dummyBadges
        };
    },
    componentDidMount: function () {},
    setBadgesData: function (error, data) {
        var parsed = this.parseBadges(data);
        this.setState({
            badges: parsed
        });
    },
    parseBadges: function (credlyResponse) {
        // do parsing here
        var data = credlyResponse;

        if (data.status === '200' && data.body && data.body.data && data.body.data.length) {
            data = _.map(data.body.data, function (badgeData) {
                return {
                    'title' : badgeData.title || '',
                    'status' : 'Achieved',
                    'description': badgeData.criteria || '',
                    'icon': badgeData.image || '',
                    icon2x: badgeData.image || ''
                };
            });
        } else {
            data = [];
        }
        return data;
    },
    render: function () {
        var badges = this.state.badges.map(function (badge) {
            var link = '/badge/' + badge.key;
            return (
                <div key={badge.key} className="col-md-4">
                    <Link to={link} className={'badge-icon-link'}>
                        <BadgeVerticalIcon
                            key={badge.key}
                            icon={badge.icon}
                            icon2x={badge.icon2x}
                            title={badge.title}
                            status={badge.status}
                            alt={badge.title}
                            description={badge.description} />
                    </Link>
                </div>
            );
        });

        return (
            <div>
                <HeroUnit>
                    <h1>Credentials</h1>
                    <p className="text-center sub-title">Earn credentials to demonstrate you have the skills to teach the web.</p>

                    <section>
                        <IconLinks>
                            <IconLink
                                linkTo=""
                                imgSrc="/img/pages/badges/svg/icon-explore.svg"
                                head="Explore"
                                subhead="See all badges we offer and which ones you qualify for."
                                />
                            <IconLink
                                linkTo=""
                                imgSrc="/img/pages/badges/svg/icon-earn.svg"
                                head="Earn"
                                subhead="Apply for badges by sharing your experiences."
                                />
                            <IconLink
                                linkTo=""
                                imgSrc="/img/pages/badges/svg/icon-share.svg"
                                head="Share"
                                subhead="Show your employers and friends you have the skills."
                                />
                        </IconLinks>
                    </section>
                </HeroUnit>

                <div className="login-section">
                    <div>
                        <img src="/img/pages/badges/svg/divider.svg" width={'90%'} className="center-block horizontal-divider"/>
                    </div>
                    <div className={'text-center login-cta'}>
                        <span className={'login-text'}>Sign in to start earning credentials.</span>
                        <a href="/login" className="btn btn-awsm">Sign In</a>
                    </div>
                    <div>
                        <img src="/img/pages/badges/svg/divider.svg" width={'90%'} alt="" className="center-block horizontal-divider"/>
                    </div>
                </div>



                <div className="inner-container badges-content">
                    <section>
                        <h2 className="text-center">Earn 21st Century Skill Credentials</h2>
                        <p className="text-center">Certain skills are critical to becoming a citizen of the web — like the ability to communicate, collaborate and create online. Hone these skills and earn badges that spotlight your expertise.</p>
                        <div className="sep-16"></div>
                        <div className="row">
                            { badges }
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

module.exports = BadgesPage;