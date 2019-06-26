## About
  
A seed start to a gulp project supporting SASS/SCSS compilation, linting, embedding angular directives, javascript minification, bundling, and launching servers and proxies right out of the box.

* Visit [my website](https://jrquick.com) for me cool stuff!

## Example

Checkout https://github.com/jrquick17/angualrjs-gulp-npm-seed for a working project using this repo.

## Installation

* Copy gulpfile.js into project root.
**Replace [DIRECTIVE] with the name of each angular directive
**Replace [TEMPLATE] to the desired output file name

* Install npm dependencies (Check out package.json for an example)

```commandline
npm install @babel/core gulp babelify browserify browser-sync vinyl-buffer gulp-concat gulp-angular-embed-templates gulp-jshint gulp-rename browserify-resolutions run-sequence gulp-sass vinyl-source-stream gulp-sourcemaps gulp-uglify --save-dev
```

## Code Example

#### build
Build the project.
```commandline
gulp build
```

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

## Contributors

Jeremy Quick<me@jrquick.com>

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
