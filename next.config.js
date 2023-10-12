const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV !== "development",
});

module.exports = withPWA(
  withBundleAnalyzer({
    webpack: (config, { isServer, dev }) => {
      if (dev && !isServer) {
        // TypeError: (0, _react.use) is not a function. (In '(0, _react.use)(response)', '(0, _react.use)' is undefined)
        // Object.assign(config.resolve.alias, {
        //   "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        //   react: "preact/compat",
        //   "react-dom/test-utils": "preact/test-utils",
        //   "react-dom": "preact/compat",
        // });
      }

      return config;
    },
  })
);
