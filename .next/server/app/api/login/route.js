"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/login/route";
exports.ids = ["app/api/login/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Ali_Jaan_OneDrive_Desktop_project_store2uu_src_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/login/route.js */ \"(rsc)/./src/app/api/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/route\",\n        pathname: \"/api/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Ali Jaan\\\\OneDrive\\\\Desktop\\\\project\\\\store2uu\\\\src\\\\app\\\\api\\\\login\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Ali_Jaan_OneDrive_Desktop_project_store2uu_src_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBbGklMjBKYWFuJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDcHJvamVjdCU1Q3N0b3JlMnV1JTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBbGklMjBKYWFuJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDcHJvamVjdCU1Q3N0b3JlMnV1JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3N0b3JlMnUvP2EwYzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWxpIEphYW5cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHN0b3JlMnV1XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGxvZ2luXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEFsaSBKYWFuXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccHJvamVjdFxcXFxzdG9yZTJ1dVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxsb2dpblxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvbG9naW4vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/login/route.js":
/*!************************************!*\
  !*** ./src/app/api/login/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nconst SECRET_KEY = process.env.JWT_SECRET || \"your_secret_key\";\nasync function POST(request) {\n    const data = await request.json();\n    const { email, password } = data;\n    try {\n        const user = await prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                message: \"User does not exist\"\n            }, {\n                status: 404\n            });\n        }\n        const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(password, user.password);\n        if (!isPasswordValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                message: \"Invalid Password\"\n            }, {\n                status: 401\n            });\n        }\n        // Generate JWT token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n            email: user.email,\n            id: user.id,\n            role: user.role\n        }, SECRET_KEY, {\n            expiresIn: \"1h\" // token will expire in 1 hour\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            success: true,\n            message: \"Login Successfully\",\n            token,\n            user: {\n                email: user.email,\n                id: user.id,\n                role: user.role\n            } // Return the user details\n        });\n    } catch (error) {\n        console.error(\"Error during login:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            message: \"Internal server error\",\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9sb2dpbi9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE4QztBQUNoQjtBQUNDO0FBQ1k7QUFFM0MsTUFBTUksU0FBUyxJQUFJSix3REFBWUE7QUFDL0IsTUFBTUssYUFBYUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7QUFFdEMsZUFBZUMsS0FBS0MsT0FBTztJQUNoQyxNQUFNQyxPQUFPLE1BQU1ELFFBQVFFLElBQUk7SUFDL0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHSDtJQUU1QixJQUFJO1FBQ0YsTUFBTUksT0FBTyxNQUFNWCxPQUFPVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUo7WUFBTTtRQUNqQjtRQUVBLElBQUksQ0FBQ0UsTUFBTTtZQUNULE9BQU9aLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQ3ZCTSxTQUFTO1lBQ1gsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ25CO1FBRUEsTUFBTUMsa0JBQWtCLE1BQU1uQix1REFBYyxDQUFDYSxVQUFVQyxLQUFLRCxRQUFRO1FBQ3BFLElBQUksQ0FBQ00saUJBQWlCO1lBQ3BCLE9BQU9qQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUN2Qk0sU0FBUztZQUNYLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNuQjtRQUVBLHFCQUFxQjtRQUNyQixNQUFNRyxRQUFRcEIsd0RBQVEsQ0FBQztZQUFFVyxPQUFPRSxLQUFLRixLQUFLO1lBQUVXLElBQUlULEtBQUtTLEVBQUU7WUFBRUMsTUFBTVYsS0FBS1UsSUFBSTtRQUFDLEdBQUdwQixZQUFZO1lBQ3RGcUIsV0FBVyxLQUFLLDhCQUE4QjtRQUNoRDtRQUVBLE9BQU92QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCZSxTQUFTO1lBQ1RULFNBQVM7WUFDVEk7WUFDQVAsTUFBTTtnQkFBRUYsT0FBT0UsS0FBS0YsS0FBSztnQkFBRVcsSUFBSVQsS0FBS1MsRUFBRTtnQkFBRUMsTUFBTVYsS0FBS1UsSUFBSTtZQUFDLEVBQUUsMEJBQTBCO1FBQ3RGO0lBQ0YsRUFBRSxPQUFPRyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyx1QkFBdUJBO1FBQ3JDLE9BQU96QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVNLFNBQVM7WUFBeUJVLE9BQU9BLE1BQU1WLE9BQU87UUFBQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNyRztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RvcmUydS8uL3NyYy9hcHAvYXBpL2xvZ2luL3JvdXRlLmpzP2RiNmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmNvbnN0IFNFQ1JFVF9LRVkgPSBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICd5b3VyX3NlY3JldF9rZXknO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gZGF0YTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgZW1haWwgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IFwiVXNlciBkb2VzIG5vdCBleGlzdFwiXHJcbiAgICAgIH0sIHsgc3RhdHVzOiA0MDQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgUGFzc3dvcmRcIlxyXG4gICAgICB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIEpXVCB0b2tlblxyXG4gICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGVtYWlsOiB1c2VyLmVtYWlsLCBpZDogdXNlci5pZCwgcm9sZTogdXNlci5yb2xlIH0sIFNFQ1JFVF9LRVksIHtcclxuICAgICAgZXhwaXJlc0luOiAnMWgnIC8vIHRva2VuIHdpbGwgZXhwaXJlIGluIDEgaG91clxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJMb2dpbiBTdWNjZXNzZnVsbHlcIixcclxuICAgICAgdG9rZW4sXHJcbiAgICAgIHVzZXI6IHsgZW1haWw6IHVzZXIuZW1haWwsIGlkOiB1c2VyLmlkLCByb2xlOiB1c2VyLnJvbGUgfSAvLyBSZXR1cm4gdGhlIHVzZXIgZGV0YWlsc1xyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBsb2dpbjonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJywgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImJjcnlwdCIsImp3dCIsIk5leHRSZXNwb25zZSIsInByaXNtYSIsIlNFQ1JFVF9LRVkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsIlBPU1QiLCJyZXF1ZXN0IiwiZGF0YSIsImpzb24iLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwidG9rZW4iLCJzaWduIiwiaWQiLCJyb2xlIiwiZXhwaXJlc0luIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/login/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAli%20Jaan%5COneDrive%5CDesktop%5Cproject%5Cstore2uu&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();