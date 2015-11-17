var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
//var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

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
        return (
            <div>
                <HeroUnit>
                    <h1>Badges</h1>
                </HeroUnit>
                { (this.state.badges ? this.state.badges : null)}
            </div>
        );
    }
});

module.exports = BadgePage;