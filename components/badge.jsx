var React       = require('react'),
    ImageTag    = require('./imagetag.jsx');

var Badge = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired,
        icon2x: React.PropTypes.string.isRequired
    },
    render: function (){
        var classNames = 'label label-default ' + this.props.status.toLowerCase(),
            statusIcon = "";

        switch (this.props.status.toLowerCase()) {
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

        return(
            <div className="badge-icon">
                <div className="image-container">
                    <ImageTag   src1x={this.props.icon}
                                src2x={this.props.icon2x}
                                alt={this.props.title} />
                </div>
                <div className="status">
                    <div className={classNames}><span dangerouslySetInnerHTML={{__html: statusIcon}}></span>{this.props.status}</div>
                </div>
            </div>
        )
    }
});

module.exports = Badge;