/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const path = require(`path`)

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Eksplorasa Online`,
    author: 'Explorasa',
    name: 'Syauqy',
    airtableApi : process.env.AIRTABLE_API_KEY,
    airtableBase : process.env.AIRTABLE_BASEID,
  },
  plugins: [],
}
