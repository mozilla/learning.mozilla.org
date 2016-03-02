var React = require('react'),
    Badge = require('./badge.jsx');

var BadgeVerticalIcon = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className='badge-vertical-icon'>
                <Badge  title={this.props.title}
                        status={this.props.status}
                        icon={this.props.icon}
                        icon2x={this.props.icon2x} />
                <div className="badge-text text-center">
                    <div className="title">{this.props.title}</div>
                    <div className="description">{this.props.description}</div>
                </div>
            </div>
        )
    }
});

module.exports = BadgeVerticalIcon;
