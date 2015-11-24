var React       = require('react'),
    ImageTag    = require('./imagetag.jsx');

var Badge = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        status: React.PropTypes.string,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    render: function (){

        /**
         * returning the Status HTML
         * @param statusVal
         * @returns ReactElement
         */
        function status (statusVal) {
            var classNames = 'label label-default ' + statusVal;
            var statusIcon = "";

            if (statusVal === undefined) {
                return "";
            }

            switch (statusVal) {
                case 'pending':
                    statusIcon = "<i class='fa fa-fw fa-clock-o'></i>";
                    break;
                case 'achieved':
                    statusIcon = "<i class='fa fa-fw fa-check'></i>";
                    break;
                case 'eligible':
                    statusIcon = "<i class='fa fa-fw fa-pencil'></i>";
                    break;
            }
            return (
                <div className="status">
                    <div className={classNames}><span dangerouslySetInnerHTML={{__html: statusIcon}}></span>{statusVal}</div>
                </div>
            );
        }

        var statusElement = "";
        if( this.props.status ){
            statusElement = status( this.props.status.toLowerCase() );
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