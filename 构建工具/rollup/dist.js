(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const str = '11';

  function gg() {
    console.log('ggg');
  }

  var name = "rollup-demo";
  var version = "1.0.0";
  var description = "更注重打包，以 `ESM` 标准为目标的构建工具，特性：";
  var main = "index.js";
  var scripts = {
  	build: "rollup -c rollup.config.cjs"
  };
  var type = "module";
  var author = "";
  var license = "ISC";
  var dependencies = {
  	rollup: "^3.9.1"
  };
  var devDependencies = {
  	"@rollup/plugin-json": "^6.0.0"
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	scripts: scripts,
  	type: type,
  	author: author,
  	license: license,
  	dependencies: dependencies,
  	devDependencies: devDependencies
  };

  console.log(pkg);
  console.log(str);
  gg();

}));
