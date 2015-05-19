'use strict';

var GulpConfig = (function () {
  function GulpConfig() {
    this.source    = './server/';
    this.serverApp = './server/';
    this.output = './build/';

    this.allTypeScript       = this.source + '**/*.ts';
    this.allServerTypeScript = this.serverApp + '**/*.ts';

    this.typings         = './typings/';
    this.libTsDefs       = this.typings + '*/*.d.ts';
    this.libTsDefList    = this.typings + 'tsd.d.ts';
    this.serverTsDefList = this.typings + 'server.d.ts';
  }

  return GulpConfig;
})();

module.exports = GulpConfig;
