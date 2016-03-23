var TRAVIS_BRANCH_CONFIGS = {
  master: {
    AWS_BUCKET: 'teach-mozilla-org-s3bucket-1oinic8tfxxim',
    NODE_ENV: 'production',
    TEACH_API_URL: 'https://teach-api-production.herokuapp.com',
    ORIGIN: 'https://teach.mozilla.org',
    NEWSLETTER_MAILINGLIST_URL: 'https://basket.mozilla.org/news/subscribe/',
    OPTIMIZELY_ID: '206878104',
    OPTIMIZELY_ACTIVE: 'yes',
    MAKE_METADATA_URL: 'https://{username}.makes.org/makes.json',
    WORDPRESS_SITE_URL: 'teachmozillaorg.wordpress.com'
  }
};

exports.getS3Env = function(env) {
  env = env || process.env;

  var config = TRAVIS_BRANCH_CONFIGS[env.TRAVIS_BRANCH];

  if (env.TRAVIS !== 'true' || env.TRAVIS_PULL_REQUEST !== 'false' ||
      !config) {
    return null;
  }

  return config;
};
