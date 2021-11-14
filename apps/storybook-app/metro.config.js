const { withNxMetro } = require('@nrwl/react-native');
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;

module.exports = withNxMetro(
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: process.env.RN_SRC_EXT
        ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
        : defaultSourceExts,
      resolverMainFields: ['sbmodern', 'browser', 'main'],
    },
  },
  {
    // Change this to true to see debugging info.
    // Useful if you have issues resolving modules
    debug: false,
    // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
    extensions: [],
  }
);
