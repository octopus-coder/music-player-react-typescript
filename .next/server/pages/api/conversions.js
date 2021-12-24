"use strict";
(() => {
var exports = {};
exports.id = 920;
exports.ids = [920];
exports.modules = {

/***/ 167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 666:
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ 555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 876:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _services_capi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(421);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_services_capi__WEBPACK_IMPORTED_MODULE_0__]);
_services_capi__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];

function handler(request, response) {
  const {
    songName,
    client_user_agent
  } = request.body;
  (0,_services_capi__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(songName, client_user_agent);
  response.status(200).json({
    message: "Conversion Sent"
  });
}
});

/***/ }),

/***/ 421:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(555);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_1__]);
uuid__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];



const CAPI_API = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL: `https://graph.facebook.com/v12.0/${process.env.REACT_APP_PIXEL_ID}/events?access_token=${process.env.REACT_APP_CAPI_ACCESS_TOKEN}`
});

async function getClientIP() {
  const {
    data
  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get("https://api.ipify.org/?format=json");
  return data.ip;
}

function parseAndHash(info) {
  return crypto_js__WEBPACK_IMPORTED_MODULE_2___default().SHA256(info.toLowerCase().replace(" ", "")).toString();
}

async function getGeoLocation(ip) {
  // const { data } = await axios.get<GeoLocation>(`http://ip-api.com/json/${ip}`);
  const {
    data
  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://ipapi.co/${ip}/json/`);
  const geoLocation = {
    country: parseAndHash(data.country),
    region_code: parseAndHash(data.region_code),
    city: parseAndHash(data.city),
    postal: parseAndHash(data.postal)
  };
  return geoLocation;
}

async function SendSelectSongEvent(songName, client_user_agent) {
  const event_id = (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)();
  const client_ip_address = await getClientIP();
  const {
    country,
    region_code: st,
    city: ct,
    postal: zp
  } = await getGeoLocation(client_ip_address);
  await CAPI_API.post("", {
    data: [{
      event_name: "SelectSong",
      event_time: Math.round(Date.now() / 1000),
      action_source: "website",
      event_id,
      event_source_url: "https://adoring-kalam-4dcc41.netlify.app/",
      user_data: {
        client_ip_address,
        client_user_agent,
        country,
        st,
        ct,
        zp
      },
      custom_data: {
        name: songName,
        method: "CAPI"
      }
    }]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SendSelectSongEvent);
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(876));
module.exports = __webpack_exports__;

})();