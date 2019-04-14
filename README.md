# Mega Menu

Build customer cross network navigation menu

## Installation

Install all dependencies. 

$ yarn

## Development

Builds the application and starts a webserver with livereload. By default the webserver starts at port 5000.
You can define a port with `$ gulp --port 5000`.

$ yarn start

## Build

Builds a minified version of the application in the dist folder.

$ gulp build --type production

## Javascript

Javascript entry file: `app/scripts/main.js` <br />

**ES6 with babel**

We are working with the webpack [babel loader](https://github.com/babel/babel-loader) in order to load our .js/.jsx files. Babel allows you to use ES6 features like class, arrow functions


## CSS

Base loader for SCSS: `app/styles/_base/app.scss`

**SCSS**

In order to preprocess the SCSS, I have created a task that runs within Gulp. 

###Requirements
* node
* npm
* gulp