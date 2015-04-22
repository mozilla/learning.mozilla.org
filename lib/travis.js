var TRAVIS_BRANCH_CONFIGS = {
  develop: {
    AWS_BUCKET: 'teach.mofostaging.net',
    NODE_ENV: 'production',
    ORIGIN: 'https://teach.mofostaging.net',
    SHOW_DEV_RIBBON: 'on'
  },
  master: {
    AWS_BUCKET: 'teach-mozilla-org-s3bucket-1oinic8tfxxim',
    NODE_ENV: 'production',
    TEACH_API_URL: 'https://teach-api-production.herokuapp.com',
    ORIGIN: 'https://teach.mozilla.org'
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
