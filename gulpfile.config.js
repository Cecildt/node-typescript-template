'use strict';

var GulpConfig = (function () {
  function GulpConfig() {
    this.source    = './server/';
    this.serverApp = './server/';
    this.output = './build/';

    this.allTypeScript       = this.source + '**/*.ts';
    this.allServerTypeScript = this.source + '**/*.ts';
    this.views               = this.source + '**/*.html';
    this.css                 = this.source + 'public/css/*';
    this.images              = this.source + 'public/img/*';
    
    this.appJS               = this.output + 'public/js/app/*.js';
    this.appJSDest           = this.output + 'public/js/app/';
    this.mainJS              = this.output + 'public/js/*.js';
    this.mainJSDest          = this.output + 'public/js/';
    this.mainCss             = this.output + 'public/css/**/*.css';
    this.mainCssDest         = this.output + 'public/css/';

    this.typings         = './typings/';
    this.libTsDefs       = this.typings + '*/*.d.ts';
    this.libTsDefList    = this.typings + 'tsd.d.ts';
    this.serverTsDefList = this.typings + 'server.d.ts';
    
  }

  return GulpConfig;
})();

module.exports = GulpConfig;
