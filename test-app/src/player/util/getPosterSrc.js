"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPosterSrc;

function getPosterSrc(playbackId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var width = options.width || 640;
  var height = options.height || '';
  var time = options.time || 1;
  var fitMode = typeof options.fitMode === 'undefined' ? 'smartcrop' : options.fitMode;
  var url = "https://image.mux.com/".concat(playbackId, "/thumbnail.png?width=").concat(width, "&fit_mode=").concat(fitMode, "&time=").concat(time);

  if (options.height) {
    url += "&height=".concat(height);
  }

  return url;
}