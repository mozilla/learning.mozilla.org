var React       = require('react'),
    classnames  = require('classnames'),
    ImageTag    = require('./imagetag.jsx');

var Badge = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        status: React.PropTypes.string,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    /**
     * returning the Status HTML
     * @param statusVal
     * @returns ReactElement
     */
    status: function (statusVal) {

        if (statusVal === undefined) {
            return '';
        }
        else{
            statusVal = statusVal.toLowerCase();
        }

        var statusIcons = {
            pending : 'fa-clock-o',
            achieved: 'fa-check',
            eligible: 'fa-pencil'
        };

        var statusClasses = classnames('fa', 'fa-fw', statusIcons[statusVal]);
        var statusIcon = <i className={statusClasses} />;

        var classNames = 'label label-default ' + statusVal;

        return (
            <div className="status">
                <div className={classNames}>
                    <span>{ statusIcon }</span>{statusVal}
                </div>
            </div>
        );

    },
    render: function (){

        var statusElement = "";
        if( this.props.status ){
            statusElement = this.status( this.props.status );
        }

        return(
            <div className="badge-icon">
                <div className="image-container">
                    <ImageTag   src1x={this.props.icon}
                                src2x={this.props.icon2x}
                                alt={this.props.title} />
                </div>
                { statusElement }
            </div>
        )
    }
});

module.exports = Badge;
