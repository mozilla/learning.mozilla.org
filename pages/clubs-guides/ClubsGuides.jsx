var React = require('react');
var HeroUnit = require('../../components/hero-unit.jsx');

var GuideList = React.createClass({
  getInitialState: function(){
    return {
      guides : []
    }
  },
  setData : function(data){
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
                <a href={ translation.url }>{ translation.title }</a><span className="language"> - ({ translation.language })</span>
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
  render: function(){
    return(
      <div className="guideList">
        { this.getLinks() }
      </div>
    )
  }
});

var ClubsGuides = React.createClass({
  statics: {
    pageClassName: 'clubs-guides',
    pageTitle: 'Clubs Guides & Resources'
  },
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups teaching the Web around the world</h2>
        </HeroUnit>
        <div className="inner-container">
          <h2>Clubs Guides &amp; Resources</h2>
          <GuideList></GuideList>
        </div>
      </div>
    );
  }
});

module.exports = ClubsGuides;
