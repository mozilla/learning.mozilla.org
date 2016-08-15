var React = require('react');

var Running = React.createClass({
  getInitialState: function(){
    return {
      guides : []
    }
  },
  contextTypes: {
    intl: React.PropTypes.object
  },
  setData : function(data){
    for(var i = 0; i < data.length; i++){
      var categoryLabel = data[i].category.toLowerCase();
      categoryLabel = "guide_category_" + categoryLabel.split(' ').join('_');
      var localizedCategory = this.context.intl.formatMessage({id: categoryLabel});
      if(localizedCategory != categoryLabel){
        data[i].category = localizedCategory;
      }
    }
    this.setState({guides : data });
  },
  fetchJSON : function(path,callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText);
          if (typeof callback === "function") callback(data);
        }
      }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
  },
  componentDidMount: function() {
    this.fetchJSON("https://mozilla.github.io/learning-networks/clubs/clubs-resources.json",this.setData);
  },
  getLinks : function(){
    var categories = this.state.guides.map(function(category){
      var guideLinks = category.guides.map(function(guide){

        if(guide.translations && guide.translations.length > 0){
          var translationLinks = guide.translations.map(function(translation){
            return (
              <li>
                <a href={ translation.url }>{ translation.title }</a>
                <span className="language"> ({ translation.language })</span>
              </li>
            );
          });
        }

        return (
          <li>
            <a href={guide.url}>{ guide.title }</a>
            { translationLinks ? <ul className="translations">{ translationLinks }</ul> : "" }
          </li>
        );
      });

      return (
        <section className="resourceCategory">
          <h3> { category.category } </h3>
          <ul>
            { guideLinks }
          </ul>
        </section>
      );
    });
    return categories;
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
          { this.getLinks() }
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

module.exports = Running;
