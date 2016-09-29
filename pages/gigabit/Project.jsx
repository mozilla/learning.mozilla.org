var React = require('react');

module.exports = React.createClass({
  render() {
    console.log(this.props.data);

    return (
      <div>
        project page
      </div>
    );
  }
});
