var React = require('react');

var ActivitiesPage = React.createClass({
  statics: {
    pageClassName: 'teaching-materials'
  },
  render: function() {
    return (
      <div>
        <section>
          <h1>Teaching Activities</h1>
          <span className="sub-title">
            Start teaching others how to read, write and participate on the web with these free activities created by teachers, educators and technologists like you. Each featured activity includes step-by-step instructions and has been tested in schools, afterschool programs, libraries and community centers around the globe. Whether learning how to code, understanding why privacy matters, or creating openly-licensed web content, we believe teaching the web should be fun and engaging!
          </span>
          <h2>More resources</h2>
          <span className="sub-title">
            Hive Learning Networks are city-based communities of educatios who champion digital skills and web literacy through connected learning. Visit each city's portfolio to find more inspiration, resources and projects for teaching and learning.
          </span>
        </section>
      </div>
    );
  }
});

module.exports = ActivitiesPage;
