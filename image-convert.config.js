// This file contains a `patterns` export that describes how
// various images in the project need to be converted for
// deployment.
//
// Each key of `patterns` is a glob pattern that matches at
// least one image in the project. The value is an object with
// the following structure:
//
// * `format` is one of `'png'`, `'jpg'`, or `'gif'`, and specifies
//   the format to convert the matched images to. If undefined,
//   the images will retain their original format.
// * `formatParams` specifies parameters to pass to the
//   image encoder. For more details, see
//   https://github.com/EyalAr/lwip#get-as-a-buffer.
//
// Note that this file also exports a `reload` function, which
// can be used to dynamically reload the module's exported data.
// This was chosen as an alternative to JSON because we wanted
// the freedom to use constants and other JavaScript features to
// avoid repetition in our data.

module.exports = {
  patterns: {
    'img/pages/**/hero-unit.jpg': {
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
