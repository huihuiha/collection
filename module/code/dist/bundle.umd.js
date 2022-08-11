(function (global, factory) {
	console.log(global =
        typeof globalThis !== "undefined" ? globalThis : global || self)
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : (
		(global =
        typeof globalThis !== "undefined" ? globalThis : global || self
		),
      factory((global.utils = {})));
})(this, function (exports) {
  "use strict";

  const age = 18;

  exports.age = age;

  Object.defineProperty(exports, "__esModule", { value: true });
});
