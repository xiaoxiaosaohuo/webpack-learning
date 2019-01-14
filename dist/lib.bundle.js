(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lib"],{

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst split = 'split';\n/* harmony default export */ __webpack_exports__[\"default\"] = (split);\n\n\n//# sourceURL=webpack:///./src/a.js?");

/***/ }),

/***/ "./src/b.js":
/*!******************!*\
  !*** ./src/b.js ***!
  \******************/
/*! exports provided: c, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return c; });\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n\nconst b = '我是b';\nconst c = 'sb';\n/* harmony default export */ __webpack_exports__[\"default\"] = (b);\n\n\n//# sourceURL=webpack:///./src/b.js?");

/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./b */ \"./src/b.js\");\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n\n\nconsole.log(_b__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/lib.js?");

/***/ })

},[["./src/lib.js","manifest"]]]);