var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var BadgeIcon = require('../components/badge-icon.jsx');
var CredlyInterface = require('../lib/credly');


var accesstoken = "d56b47dc5f3b23abf1a8fc30b7d546464c1e73dc7b2a2683b4e385a719b28958d25f6f954f352a3eb615c953b4f66ca1aef32520f506b032b10996e97be18451";

var BadgePage = React.createClass({
    statics: {
        pageTitle: 'Badges',
        pageClassName: 'badges'
    },
    getInitialState: function() {
        return {
            badges: false
        };
    },
    componentDidMount: function() {
        this.CredlyInterface = new CredlyInterface(accesstoken);
        var options = {
            verbose: 0,
            page: 1,
            perPage: 10,
            orderDirection: "ASC"
        };
        this.CredlyInterface.badges(options, this.setBadgesData);
    },
    setBadgesData: function(error, data) {
        var parsed = this.parseBadges(data);
        this.setState({
            badges: parsed
        });
    },
    parseBadges: function(credlyResponse) {
        // do parsing here
        var data = credlyResponse;
        return data;
    },
    render: function() {

        var data = [
            {
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            },
            {
                title: 'Collaboration',
                status: 'pending',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Collaborative.png',
                icon2x: '/img/components/badge-icon/Collaborative@2x.png'
            },
            {
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            },
            {
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                title: 'Creativity',
                status: 'eligible',
                description: 'Lorem ipsum dolor sit amet',
                icon: '/img/components/badge-icon/Creativity.png',
                icon2x: '/img/components/badge-icon/Creativity@2x.png'
            },
            {
                title: 'Problem Solving',
                status: 'achieved',
                description: '',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            }
        ];

        return (
            <div>
                <HeroUnit>
                    <h1>Badges</h1>
                </HeroUnit>

                <div className="inner-container badges-content">
                    <section>
                        <p className="text-center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum, sed? Atque deleniti, excepturi itaque iusto labore laborum libero mollitia necessitatibus nihil non officia quia quisquam similique? Deserunt, quasi, reprehenderit.
                        </p>

                        <div className="row">
                            { data.map(function(badge){
                                    return (
                                        <div className="col-md-4">
                                            <BadgeIcon
                                                icon={badge.icon}
                                                icon2x={badge.icon2x}
                                                title={badge.title}
                                                status={badge.status}
                                                alt={badge.title}
                                                description={badge.description} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

module.exports = BadgePage;