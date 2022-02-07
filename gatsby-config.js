/* eslint-disable import/no-extraneous-dependencies */
const sass = require("sass");
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "LA GENTE: The Latinx/e Theatre Production Network",
    description: `LA GENTE: The Latinx/e Theatre Production Network`,
    siteUrl: `https://lagentenetwork.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
        implementation: sass,
      },
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.WWD_GOOGLE_ANALYTICS_ID,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-favicon`,
    //   options: {
    //     logo: "./src/favicon.png",
    //     injectHTML: true,
    //     icons: {
    //       android: false,
    //       appleIcon: false,
    //       appleStartup: false,
    //       coast: false,
    //       favicons: true,
    //       firefox: false,
    //       twitter: false,
    //       yandex: false,
    //       windows: false,
    //     },
    //   },
    // },
  ],
};
