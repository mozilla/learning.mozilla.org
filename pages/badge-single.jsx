var React = require('react'),
    HeroUnit = require('../components/hero-unit.jsx'),
    BadgeHorizontalIcon = require('../components/badge-horizontal-icon.jsx'),
    _ = require('underscore');


var BadgePage = React.createClass({
    statics: {
        pageTitle: 'Badges',
        pageClassName: 'badges single-badge'
    },
    getInitialState: function () {
        return {
            badge: {
                key: 1,
                title: 'Collaboration: Communication',
                status: 'achieved',
                description: 'This badge is issued to those who demonstrate an ability to interacts in a respectful manner; demonstrates active listening; contributes to group meetings and a constructive climate.',
                icon: '/img/components/badge-icon/ProblemSolving.png',
                icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
            }
        };
    },
    render: function () {
        return (
            <div>

                <div className="row top-back-navigation">
                    <div className="col-md-12">
                        <a className="text-uppercase btn btn-link" href="#"><span className="fa fa-long-arrow-left"></span> Back to credentials</a>
                    </div>
                </div>

                <BadgeHorizontalIcon
                    key={this.state.badge.key}
                    icon={this.state.badge.icon}
                    icon2x={this.state.badge.icon2x}
                    title={this.state.badge.title}
                    status={this.state.badge.status}
                    alt={this.state.badge.title}
                    description={this.state.badge.description}>

                    <div className="text-uppercase">21st century skills</div>
                    <h2 className="title">{this.state.badge.title}</h2>
                    <div className="description">{this.state.badge.description}</div>

                </BadgeHorizontalIcon>
            </div>
        );
    }
});

module.exports = BadgePage;