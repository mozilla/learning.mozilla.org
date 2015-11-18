var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var BadgeIcon = require('../components/badge-icon.jsx');
var CredlyInterface = require('../lib/credly');
var _ = require('underscore');


var accesstoken = "85616b6a1c21bd3605529711470c3945f2b743d6b1163524b799a842bfeb1cf3e6aaa360e10202c5fe50f9a0bda3a0656831f890fe62d733e582341e5b56d13c";

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
        console.log( parsed , '@parsed');
        this.setState({
            badges: parsed
        });
    },
    parseBadges: function(credlyResponse) {
        // do parsing here
        var data = credlyResponse;

        if( data.status == '200' && data.body && data.body.data && data.body.data.length ){
            data = _.map(data.body.data , function(badgeData){
                return {
                    'title' : badgeData.title || '',
                    'status' : 'Achieved',
                    'description': badgeData.criteria || '',
                    'icon': badgeData.image || '',
                    icon2x: badgeData.image || ''
                }
            });
            console.log(data);
        }else{
            data = [];
        }
        return data;
    },
    render: function() {

        var dummyBadges = [
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

        //display dummy data
        //var data = _.union(this.state.badges,dummyBadges);
        var data = this.state.badges || [];

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