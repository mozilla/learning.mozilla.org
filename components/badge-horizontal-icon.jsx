var React = require('react'),
    Badge = require('./badge.jsx');

var BadgeHorizontalIcon = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className='badge-horizontal-icon'>
                <div className="row">
                    <div className="col-md-4">
                        <Badge  title={this.props.title}
                                status={this.props.status}
                                icon={this.props.icon}
                                icon2x={this.props.icon2x} />
                    </div>
                    <div className="col-md-8">
                        <div className="badge-description">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = BadgeHorizontalIcon;
