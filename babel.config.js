module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      { globals: ['__scanCodes', '__scanOCR'] },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          containers: './src/containers',
          services: './src/services',
          context: './src/context',
          hooks: './src/hooks',
          i18n: './src/i18n',
          navigation: './src/navigation',
          permissions: './src/permissions',
          store: './src/store',
          selectors: './src/selectors',
          screens: './src/screens',
          types: './src/types',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
  ],
};
