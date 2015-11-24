var React = require('react'),
    HeroUnit = require('../components/hero-unit.jsx'),
    BadgeHorizontalIcon = require('../components/badge-horizontal-icon.jsx'),
    RequirementsList = require('../components/requirement-list.jsx'),
    Badge = require('../components/badge.jsx'),
    Link = require('react-router').Link,
    _ = require('underscore');

/**
 * Badges Navigation component
 */
var SingleBadgePageNavigation = React.createClass({
    propTypes : {
        nextNavigationDetails : function () {
            return React.PropTypes.object({
                url: React.PropTypes.string.isRequired,
                icon: React.PropTypes.string.isRequired,
                icon2x: React.PropTypes.string
            });
        },
        prevNavigationDetails : function () {
           return React.PropTypes.object({
               url : React.PropTypes.string.isRequired,
               icon : React.PropTypes.string.isRequired,
               icon2x : React.PropTypes.string
           });
        }
    },
    render : function () {
        return (
            <div className="single-badge-page-navigation">
                <div className="row">
                    <div className="col-xs-6">
                        <Link to={this.props.prevNavigationDetails.url} className="prev">
                            <div className="icon">
                                <Badge
                                    title="Previous"
                                    icon={this.props.prevNavigationDetails.icon}
                                    icon2x={this.props.prevNavigationDetails.icon2x} />
                            </div>
                            <div className="text"><span className="fa fa-long-arrow-left"></span> Previous</div>
                        </Link>
                    </div>
                    <div className="col-xs-6 text-right">
                        <Link to={this.props.nextNavigationDetails.url} className="next">
                            <div className="text">Next <span className="fa fa-long-arrow-right"></span></div>
                            <div className="icon">
                                <Badge
                                    title="Next"
                                    icon={this.props.nextNavigationDetails.icon}
                                    icon2x={this.props.nextNavigationDetails.icon2x} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * Single badge Page
 * should take a badgeId
 */
var BadgePage = React.createClass({
    statics: {
        pageTitle: 'Badges',
        pageClassName: 'badges single-badge'
    },
    onQualificationsSubmit : function (){
      console.log ('Qualifications');
    },
    handleFileSelect : function () {
        console.log ('File Select');
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
            },
            requirements: [
                'Journal entries of personal self-reflections during group project',
                'Notes of observations by peers or mentors',
                'Peer-to-peer recommendations by group members',
                'Writings, drawings, images, videos, and/or presentations to demonstrate a range of ways ideas are shared and received in group processes and projects',
                'Documents that demonstrate collaboration and design authoring tools (white boards, google docs, spreadsheets, etc.)'
            ],
            navigation: {
                next: {
                    url : '/badge/2',
                    icon: '/img/components/badge-icon/ProblemSolving.png',
                    icon2x: '/img/components/badge-icon/ProblemSolving@2x.png'
                },
                prev: {
                    url : '/badge/4',
                    icon: '/img/components/badge-icon/Creativity.png',
                    icon2x: '/img/components/badge-icon/Creativity@2x.png'
                }
            }
        };
    },
    render: function () {
        return (
            <div>

                <div className="row top-back-navigation">
                    <div className="col-md-12">
                        <Link className="text-uppercase btn btn-link" to="/badges/"><span className="fa fa-long-arrow-left"></span> Back to credentials</Link>
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


                <div className="badge-requirement">
                    <h3>Badge Requirements</h3>
                    <p>Make or write something that demonstrates your understanding of any two or more of the following:</p>

                    <RequirementsList
                        list={this.state.requirements}
                        icon="fa fa-check"/>
                </div>

                <div className="apply-send-qualifications">
                    <p><strong>Ideas?</strong> You could submit a blog post, a project you made using Mozilla's tools, or another web creation you made. Demonstrate your understanding in your own unique way!</p>


                    <h3>Apply for this badge</h3>

                    <form className="horizontal-form" role="form" onSubmit={this.onQualificationsSubmit}>
                        <div className="form-group">
                            <label htmlFor="qualifications" className="control-label">What qualifies you to earn this badge?</label>
                            <textarea
                                name="qualifications"
                                ref="qualifications"
                                id="qualifications"
                                cols="30"
                                rows="10"
                                className="form-control"
                                placeholder="I've earned this badge by working on this project: [link]. My project demonstrates an understanding of [skill/competency] through [explain further]."></textarea>
                        </div>

                        <div className="optional-file-input">
                            <input type="file" className="hidden" name="optional_file" id="optional_file" ref="optionalFile" />
                            <button type="button" ref="optional_file" className="btn btn-link" onClick={this.handleFileSelect}>Add Optional Attachment(s)</button>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-awsm">Apply</button>
                        </div>
                    </form>

                </div>

                <img src="/img/pages/badges/svg/divider.svg" alt="" className="center-block horizontal-divider"/>

                <div className="navigation">
                    <SingleBadgePageNavigation
                        nextNavigationDetails={this.state.navigation.next}
                        prevNavigationDetails={this.state.navigation.prev} />
                </div>

            </div>
        );
    }
});

module.exports = BadgePage;