var propertiesParser = require(`properties-parser`);
var path = require(`path`);
var FS = require(`q-io/fs`);
var argv = require(`minimist`)(process.argv.slice(2));

var habitat = require('habitat');
habitat.load();
var env = new habitat();

var supportedLocales = process.env.SUPPORTED_LOCALES || `*`;

if (supportedLocales.indexOf('[') !== -1) {
  // FIXME: TODO: this circumvents a problem with habitat and
  //              heroku, where the environment variable ['en-US']
  //              magically becomes '['en-US']', which thus gets
  //              turned into a String, rather than an Array...
  //
  // see: https://github.com/mozilla/learning.mozilla.org/pull/2120
  //
  supportedLocales = JSON.parse(supportedLocales.replace(/'/g,'"'));
}

var config = {
  "dest": argv.dest || `dist`,
  "src": argv.src || `locales`
};

function getListLocales() {
  return new Promise((resolve, reject)=> {
    if (supportedLocales === `*`) {
      FS.listDirectoryTree(path.join(process.cwd(), config.src)).then((dirTree) => {
        var localeList = [];

        // Get rid of the top level, we're only interested with what's inside it
        dirTree.splice(0,1);
        dirTree.forEach((localeLocation) => {
          // Get the locale code from the end of the path. We're expecting the structure of Pontoon's output here
          var langcode = localeLocation.split(path.sep).slice(-1)[0];

          if (langcode) {
            localeList.push(langcode);
          }
        });
        return resolve(localeList);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    } else {
      resolve(supportedLocales);
    }
  });
}

function writeFile(entries) {
  var dictionary = entries.reduce((prevEntry, entry) => {
    prevEntry[entry.locale] = entry.content;
    return prevEntry;
  }, {});
  var publicPath = path.join(process.cwd(), config.dest);
  var localesPath = path.join(publicPath, `locales.json`);

  FS.makeTree(publicPath).then(() => {
    FS.write(localesPath, JSON.stringify(dictionary, null, 2))
    .then(() => {
      console.log(`Done compiling locales at: ${localesPath}`);
    }).catch((e) => {
      console.log(e);
    });
  }).catch((e) => {
    console.log(e);
  });
}

function readPropertiesFile(filePath) {
  return new Promise((resolve, reject) => {
    propertiesParser.read(filePath, (messageError, messageProperties) => {
      if (messageError && messageError.code !== `ENOENT`) {
        return reject(messageError);
      }
      resolve(messageProperties);
    });
  });
}

function getContentMessages(locale) {
  return new Promise((resolve, reject) => {
    FS.listTree(path.join(process.cwd(), config.src, locale), (filePath) => {
      return path.extname(filePath) === `.properties`;
    }).then((files) => {
      Promise.all(files.map(readPropertiesFile)).then((properties) => {
        var mergedProperties = {};

        properties.forEach((messages) => {
          Object.assign(mergedProperties, messages);
        });

        resolve({content: mergedProperties, locale: locale});
      });
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  });
}

function processMessageFiles(locales) {
  if (!locales) {
    console.error(`List of locales was undefined. Cannot run pontoon-to-json.`);
    process.exit(1);
  }
  if (locales.length === 0) {
    console.error(`Locale list is empty. Cannot run pontoon-to-json.`);
    process.exit(1);
  }
  console.log(`processing the following locales: ${locales.toString()}`);
  console.log(`constructor: ${locales.constructor}`);  
  return Promise.all(locales.map(getContentMessages));
}

getListLocales().then(processMessageFiles)
.then(writeFile).catch((err)=> {
  console.error(err);
});