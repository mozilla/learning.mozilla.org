var categories = require('./categories');

module.exports = {
  fill: function(v) {
    if (typeof v === 'number') {
      if(v===0) return 'white';
      if(v===1) return '#EEE';
      if(v>=2) return 'white';
    }
    if(v===categories.PS) return 'purple';
    if(v===categories.Com) return 'gold';
    if(v===categories.Cre) return 'royalblue';
    if(v===categories.Col) return 'limegreen';

    if(v==='highlight') return 'rgba(255,200,0,0.3)';

    return "transparent";
  },

  stroke: function(v) {
    if (typeof v === 'number') {
      if(v===0) return 'black';
      if(v===1) return 'black';
      if(v>=2) return 'black';
    }
    if(v===categories.PS) return 'none';
    if(v===categories.Com) return 'none';
    if(v===categories.Cre) return 'none';
    if(v===categories.Col) return 'none';

    return "transparent";
  }
};
