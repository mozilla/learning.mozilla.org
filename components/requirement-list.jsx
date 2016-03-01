var React = require('react');

var RequirementRow = React.createClass({
    propTypes: {
        text        : React.PropTypes.string.isRequired,
        icon        : React.PropTypes.string
    },
    render: function () {
        var icon = this.props.icon ? this.props.icon : 'fa fa-check';
        return (
            <li>
                <div className="icon-wrapper">
                    <span className={icon}></span>
                </div>
                <div className="text">
                    { this.props.text }
                </div>
            </li>
        );
    }
});


var RequirementsList = React.createClass({
    propTypes: {
        list        : React.PropTypes.array.isRequired,
        className   : React.PropTypes.string,
        icon        : React.PropTypes.string
    },
    render: function () {
        var className = this.props.className ? 'list-unstyled requirements-list' + this.props.className : 'list-unstyled requirements-list';
        var icon = this.props.icon ? this.props.icon : 'fa fa-check';
        var listItems = this.props.list.map(function(item,position){
            if( item ){
                return <RequirementRow key={position + '-' + item} icon={icon} text={item} />
            }
        });

        return (
            <ul className={className}>
                { listItems }
            </ul>
        );
    }
});

module.exports = RequirementsList;
