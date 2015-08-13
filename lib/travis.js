var TRAVIS_BRANCH_CONFIGS = {
  develop: {
    AWS_BUCKET: 'teach.mofostaging.net',
    NODE_ENV: 'production',
    ORIGIN: 'https://teach.mofostaging.net',
    SHOW_DEV_RIBBON: 'on',
    PLEDGE_MAILINGLIST_URL: 'https://sendto.mozilla.org/page/s/mentor-signup-for-teach-site-staging-testing',
    PLEDGE_MAILINGLIST_PRIVACY_NAME: 'custom-3557'
  },
  master: {
    AWS_BUCKET: 'teach-mozilla-org-s3bucket-1oinic8tfxxim',
    NODE_ENV: 'production',
    TEACH_API_URL: 'https://teach-api-production.herokuapp.com',
    ORIGIN: 'https://teach.mozilla.org',
    PLEDGE_MAILINGLIST_URL: 'https://sendto.mozilla.org/page/s/mentor-signup',
    PLEDGE_MAILINGLIST_PRIVACY_NAME: 'custom-1788'
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
