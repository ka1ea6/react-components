/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require("path");

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    // This addon handles CSS framework integration
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  implementation: require.resolve("postcss"),
                },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.resolve(__dirname, "../src/components"),
      "@/styles": path.resolve(__dirname, "../src/styles"),
      "@/lib": path.resolve(__dirname, "../src/lib"),
    };
    // Remove any existing rule handling SVG files
    config.module.rules = config.module.rules.filter(
      (rule) => !rule.test || !rule.test.test(".svg")
    );
    // Add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }, // No need for webpackFinal if you're using the addon-styling-webpack
};
export default config;
