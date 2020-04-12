# firearts.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/36c81cca-18f3-433f-9db0-c02921d893d4/deploy-status)](https://app.netlify.com/sites/firearts/deploys) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A static site generator using Jekyll and Gulp to generate HTML from markdown files. CSS is built using TailwindCSS, trimmed down using PurgeCSS, and then inlined into the HTML by Jekyll (called as a child process in the gulp flow).

## Installation and Usage

1. Clone the repo locally.
1. Install dependencies:
    - `yarn start` to run `bundle install` and `yarn`
1. Run `yarn develop` to start up a development server.
1. Run `yarn build` for a production build.

## Deploy

With that said, in parallel with this there is a Github/Netlify build that is triggered by a PR to the upstream repo. Once opened test builds are kicked off in Netlify which can be previewed. If good you can merge branches through `staging` and then to `master` which will build the site there too. Eventually this will be the flow.

## To Dos

- Fix sitemap automation in build.
- Investigate headless CMS options (Netlify CMS in particular) to managed the content a litte easier.
- Cut Jekyll and use something more barebones and easier to configure with styles outside of the HTML build.
