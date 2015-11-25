var React = require('react');

var SocialShareButton = React.createClass({
    propTypes : {
        networkType: React.PropTypes.string.isRequired,
        iconClassName: React.PropTypes.string.isRequired
    },
    render : function () {
        return (
            <a href="#" className={"btn icon-only btn-social " + this.props.networkType }>
                <i className={this.props.iconClassName}></i>
            </a>
        )
    }
});

var SocialShare = React.createClass({
    SOCIAL_NETWORKS : [
        {
            name: 'facebook',
            iconClassName: 'fa fa-facebook'
        },
        {
            name: 'twitter',
            iconClassName : 'fa fa-twitter'
        },
        {
            name: 'linkedin',
            iconClassName : 'fa fa-linkedin'
        }
    ],
    render : function () {

        var networksBtn = this.SOCIAL_NETWORKS.map(function( network ){
            return <SocialShareButton networkType={network.name} iconClassName={network.iconClassName} />
        });

        return (
            <div className="social-share-wrapper">
                { networksBtn }
            </div>
        )
    }
});

module.exports = SocialShare;
