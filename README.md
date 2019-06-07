# firearts.org

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A static site generator using Jekyll and Gulp to generate HTML from markdown files. CSS is built using TailwindCSS, trimmed down using PurgeCSS, and then inlined into the HTML by Jekyll (called as a child process in the gulp flow).

## Installation and Usage

1. Clone the repo locally.
1. Install dependencies:
   - `bundle install` to install Ruby dependencies from Gemfile
   - `yarn` to install npm packages
1. Run `yarn develop` to start up a development server with Browsersync that watches changes to various files.
1. Run `yarn build` for a production build.

## Deploy

For now this is still hosted on a garbage hosting plan so the steps for now are:

1. `yarn build` to build the site files
1. FTP up the HTML and images.
1. The `static/.htaccess` file should match what is on the current garabage host so modifying that and uploading should fix redirect issues.
1. The `sitemap.xml` generated should be an automated list of pages built (using `jekyll-sitemap`)

With that said, in parallel with this there is a Github/Netlify build that is triggered by a PR to the upstream repo. Once opened test builds are kicked off in Netlify which can be previewed. If good you can merge branches through `staging` and then to `master` which will build the site there too. Eventually this will be the flow.

## To Dos

- Investigate headless CMS options (Netlify CMS in particular) to managed the content a litte easier.
- Cut Jekyll and use something more barebones and easier to configure with styles outside of the HTML build.

## Also check out

- [brianmercer/metalsmith-template](https://github.com/brianmercer/metalsmith-template)
