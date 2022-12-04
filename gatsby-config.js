/* eslint-disable import/no-extraneous-dependencies */
const sass = require("sass");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: "designer",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
          {
            singularName: "designer",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
          {
            singularName: "location",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
          {
            singularName: "expertise",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
        ],
        singleTypes: [
          {
            singularName: "about",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
          {
            singularName: "home",
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
            },
          },
        ],
      },
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
  ],
};
