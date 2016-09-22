var React = require('react');

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var Running = React.createClass({
  getInitialState: function(){
    return {
      guides : []
    };
  },
  contextTypes: {
    intl: React.PropTypes.object
  },
  componentDidMount: function() {
    this.props.teachAPI.getClubsGuides((err, res) => {
      if(err) {
        this.setState({error: err});
        return;
      }

      var data = res.body;

      data.forEach(dataItem => {
        var categoryLabel = dataItem.category.toLowerCase();

        categoryLabel = "guide_category_" + categoryLabel.split(' ').join('_');

        var localizedCategory = this.context.intl.formatMessage({id: categoryLabel});

        if(localizedCategory !== categoryLabel){
          dataItem.category = localizedCategory;
        }
      });

      this.setState({guides : data });
    });
  },
  getLinkForGuide: function(guide) {
    if(guide.translations && guide.translations.length > 0){
      var translationLinks = guide.translations.map(function(translation){
        return (
          <li key={translation.title}>
            <a href={ translation.url }>{ translation.title }</a>
            <span className="language"> ({ translation.language })</span>
          </li>
        );
      });
    }

    return (
      <li key={guide.title}>
        <a href={guide.url}>{ guide.title }</a>
        { translationLinks ? <ul className="translations">{ translationLinks }</ul> : "" }
      </li>
    );
  },
  getGuideLinks: function(category) {
    var guideLinks = category.guides.map(this.getLinkForGuide);
    var cat = category.category;

    return (
      <section className="resourceCategory" key={cat}>
        <h3> { cat } </h3>
        <ul>
          { guideLinks }
        </ul>
      </section>
    );
  },
  getGuideList: function() {
    if(this.state.error) {
      console.error("Failed to get clubs guides with: ", this.state.error);
      return (
        <p>Failed to get the clubs guides!</p>
      );
    }

    return this.state.guides.map(this.getGuideLinks);
  },
  render: function () {
    return (
      <div>

        <div className="row two-col-feature">
          <div className="col-md-6 image-column">
            <div className="image"></div>
          </div>
          <div className="col-md-6">
            <h1>{this.context.intl.formatMessage({id: 'club_event_reports_title'})}</h1>
            <p>{this.context.intl.formatMessage({id: 'club_event_reports_message'})}</p>
            <a className="secondary-button" href="https://docs.google.com/forms/d/e/1FAIpQLSfnhqzTSgGrsyK9klf0KlN2tpsuXODsJTn_wRDJcBmN3wCaSg/viewform?c=0&w=1">{this.context.intl.formatMessage({id: 'club_event_reports_post_link'})}</a>
          </div>
        </div>

        <h1 className="center-title">{this.context.intl.formatMessage({id: 'club_guides_title'})}</h1>

        <div className="guideList">
          { this.getGuideList() }
        </div>

        <hr className="square-divider" />

        <section className="row centered-actions">
          <a href="https://twitter.com/MozLearn" className="col-md-4">
            <div className="icon icon-twitter"></div>
            <h1>{this.context.intl.formatMessage({id: 'connect_twitter_title'})}</h1>
            <p>{this.context.intl.formatMessage({id: 'connect_twitter_message'})}</p>
          </a>
          <a href="https://www.facebook.com/groups/mozillaclubs/" className="col-md-4">
            <div className="icon icon-connect"></div>
            <h1>{this.context.intl.formatMessage({id: 'facebook_group_title'})}</h1>
            <p>{this.context.intl.formatMessage({id: 'facebook_group_message'})}</p>
          </a>
          <a href="https://forum.learning.mozilla.org/t/if-youre-new-to-the-community-please-introduce-yourself/15" className="col-md-4">
            <div className="icon icon-discourse"></div>
            <h1>{this.context.intl.formatMessage({id: 'discourse_forum_title'})}</h1>
            <p>{this.context.intl.formatMessage({id: 'discourse_forum_message'})}</p>
          </a>
        </section>
      </div>
    );
  }
});

module.exports = withTeachAPI(Running);
