var React = require('react');
//var Router = require('react-router');
//var Link = Router.Link;
var ImageTag = require('./imagetag.jsx');
//var _ = require('underscore');

var BadgeIcon = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    render: function() {
        var classNames = 'label label-default '+this.props.status.toLowerCase();
        var statusIcon = "";
        switch( this.props.status.toLowerCase() ){
            case 'pending' : statusIcon = "<i class='fa fa-fw fa-clock-o'></i>";break;
            case 'achieved' : statusIcon = "<i class='fa fa-fw fa-check'></i>";break;
            case 'eligible' : statusIcon = "<i class='fa fa-fw fa-pencil'></i>";break;
        }

        return (
            <div className='badge-icon'>
                <div className="image-container">
                    <ImageTag src1x={this.props.icon}
                              src2x={this.props.icon2x} />
                </div>
                <div className="status">
                    <div className={classNames}><span dangerouslySetInnerHTML={{__html: statusIcon}}></span>{this.props.status}</div>
                </div>
                <div className="badge-text text-center">
                    <div className="title">{this.props.title}</div>
                    <div className="description">{this.props.description}</div>
                </div>
            </div>
        )
    }
});

module.exports = BadgeIcon;
