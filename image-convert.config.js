module.exports = {
  patterns: {
    'img/pages/**/hero-*.png': {
      format: 'jpg',
      formatParams: {
        quality: 70
      }
    }
  },
  reload: function() {
    delete require.cache[__filename];
    this.patterns = require(__filename).patterns;
  }
};
