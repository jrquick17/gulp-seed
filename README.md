# angularjs-gulp-npm-seed
  
![](logo.png)

## Index ##

* [About](#about)
* [Setup](#setup)
* [Example](#about)
* [Documentation](#documentation)

## About
  
A seed start to a gulp project supporting SASS/SCSS compilation, linting, embedding angular directives, javascript minification, bundling, and launching servers and proxies right out of the box.

* Visit [my website](https://jrquick.com) for me cool stuff!

## Setup

* Copy gulpfile.js into project root.
**Replace [DIRECTIVE] with the name of each angular directive
**Replace [TEMPLATE] to the desired output file name

* Install npm dependencies (Check out package.json for an example)

```commandline
npm install @babel/core gulp babelify browserify browser-sync vinyl-buffer gulp-concat gulp-angular-embed-templates gulp-jshint gulp-rename browserify-resolutions run-sequence gulp-sass vinyl-source-stream gulp-sourcemaps gulp-uglify --save-dev
```

* Build the project.

```commandline
gulp build
```

## Example

Checkout https://github.com/jrquick17/angualrjs-gulp-npm-seed for a working project using this repo.

## Documentation 

#### build & watch
Build the project anytime there is a change.
```commandline
gulp
```

#### build & watch & launch server
Build the project anytime there is a change and run on a server.
```commandline
gulp serve
```

#### build & watch & launch proxy server
Build the project anytime there is a change and run on a proxy server.
```commandline
gulp proxy
```
