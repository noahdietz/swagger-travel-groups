'use strict';

var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static');

// var SWAGGER_DOCS_PATH  = '/:id/swagger-docs/';
var SWAGGER_UI_PATH    = '/:id/docs/';
var SWAGGER_UI_FILES   = './node_modules/swagger-ui/dist';
// var SWAGGER_DOCS_FILES = './node_modules/swagger-docs/dist';

var indexHtml = fs.readFileSync(path.join(SWAGGER_UI_FILES, 'index.html'), 'utf-8');
// var swaggerDocsConfig = require('./config/docs.config.json');

// put relative path for loading url in swagger-ui index.html
indexHtml = indexHtml.replace(
  'url = "http://petstore.swagger.io/v2/swagger.json"',
  'url = "./api/swagger/"'
);

module.exports = function docsRouter(app) {

  // // --------------------------- Swagger Docs-----------------------------------

  // // Serve the configuration for swagger docs
  // app.get(SWAGGER_DOCS_PATH + 'config.json', function(req, res) {
  //   res.send(swaggerDocsConfig);
  // });

  // // Serve the static assets for swagger docs
  // app.use(SWAGGER_DOCS_PATH, serveStatic(SWAGGER_DOCS_FILES));


  // --------------------------- SwaggerUI -------------------------------------

  // serve the modified index.html for swagger ui
  app.get(SWAGGER_UI_PATH, function(req, res) {
    res.setHeader('content-type', 'text/html');
    res.send(indexHtml);
  });

  // serve the static assets for swagger ui
  app.use(SWAGGER_UI_PATH, serveStatic(SWAGGER_UI_FILES));
};