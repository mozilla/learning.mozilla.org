var _ = require('underscore');
var React = require('react');
var Map = require('../../components/map.jsx');
var ClubListItem = require('./ClubListItem.jsx');

var ClubList = React.createClass({
  COLUMNS: 2,
  GRID_COLUMNS_PER_ROW: 12,
  propTypes: {
    clubs: React.PropTypes.array.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onZoomToLocation: React.PropTypes.func.isRequired
  },
  statics: {
    Item: ClubListItem
  },
  renderColumn: function(key, clubs) {
    var colClass = 'col-xs-' + (this.GRID_COLUMNS_PER_ROW / this.COLUMNS);
    return (
      <div className={colClass} key={key}>
        <ul className="list-unstyled colored-list">
          {clubs.map(function(club, i) {
            return  <ClubListItem key={i} club={club}
                                  username={this.props.username}
                                  onEdit={this.props.onEdit}
                                  onDelete={this.props.onDelete}
                                  onZoomToLocation={this.props.onZoomToLocation} />;
          }, this)}
        </ul>
      </div>
    );
  },
  render: function() {
    var clubs = _.sortBy(this.props.clubs, 'name');
    var itemsPerColumn = Math.ceil(this.props.clubs.length / this.COLUMNS);
    var columns = _.range(this.COLUMNS).map(function(i) {
      return this.renderColumn(i, clubs.slice(
        i * itemsPerColumn,
        (i + 1) * itemsPerColumn
      ));
    }, this);

    return <div className="row">{columns}</div>;
  }
});

module.exports = ClubList;
