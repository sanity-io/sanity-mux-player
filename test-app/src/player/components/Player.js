"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _hls = _interopRequireDefault(require("hls.js"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _getPosterSrc = _interopRequireDefault(require("../util/getPosterSrc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  assetDocument: _propTypes.default.object.isRequired,
  autoload: _propTypes.default.bool,
  autoplay: _propTypes.default.bool,
  loop: _propTypes.default.bool,
  showControls: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  poster: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  onClick: _propTypes.default.func
};
var handledPropNames = ['assetDocument', 'autoload', 'autoplay', 'muted', 'showControls', 'style', 'className', 'poster', 'onClick', 'children'];

var SanityMuxPlayer =
/*#__PURE__*/
function (_Component) {
  _inherits(SanityMuxPlayer, _Component);

  function SanityMuxPlayer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SanityMuxPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SanityMuxPlayer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      posterUrl: null,
      source: null,
      isLoading: true,
      error: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "videoContainer", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hls", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleVideoClick", function (event) {
      var autoload = _this.props.autoload;

      if (!autoload) {
        _this.setState({
          showControls: true
        });

        if (_this.hls) {
          _this.hls.startLoad(0);
        }
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    return _this;
  }

  _createClass(SanityMuxPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.video = _react.default.createRef();
      this.setState(SanityMuxPlayer.getDerivedStateFromProps(this.props));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.source !== null && this.video.current && !this.video.current.src) {
        this.setState({
          error: null
        });
        this.attachVideo();
      }

      if (this.state.source !== null && this.state.source !== prevState.source) {
        this.setState({
          error: null,
          showControls: false
        });

        if (this.hls) {
          this.hls.destroy();
        }

        this.attachVideo();
      }
    }
  }, {
    key: "getVideoElement",
    value: function getVideoElement() {
      return this.video && this.video.current;
    }
  }, {
    key: "attachVideo",
    value: function attachVideo() {
      var _this2 = this;

      var autoload = this.props.autoload;

      if (_hls.default.isSupported()) {
        this.hls = new _hls.default({
          autoStartLoad: autoload
        });
        this.hls.loadSource(this.state.source);
        this.hls.attachMedia(this.video.current);
        this.hls.on(_hls.default.Events.MANIFEST_PARSED, function () {
          if (_this2.videoContainer.current) {
            _this2.videoContainer.current.style.display = 'block';
          }
        });
        this.hls.on(_hls.default.Events.ERROR, function (event, data) {
          switch (data.type) {
            case _hls.default.ErrorTypes.NETWORK_ERROR:
              _this2.videoContainer.current.style.display = 'none';

              _this2.setState({
                error: data
              });

              break;

            case _hls.default.ErrorTypes.MEDIA_ERROR:
              // Don't output anything visible as these mostly are non-fatal
              break;

            default:
              _this2.videoContainer.current.style.display = 'none';

              _this2.setState({
                error: data
              });

          }

          console.error(data); // eslint-disable-line no-console
        });
      } else if (this.video.current.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.current.src = this.state.source;
        this.video.current.addEventListener('loadedmetadata', function () {
          _this2.videoContainer.current.style.display = 'block';
        });
        this.video.current.addEventListener('error', function () {
          _this2.videoContainer.current.style.display = 'none';

          _this2.setState({
            error: {
              type: "".concat(_this2.video.current.error.constructor.name, " code ").concat(_this2.video.current.error.code)
            }
          });

          console.error(_this2.video.current.error); // eslint-disable-line no-console
        });
      }
    }
  }, {
    key: "render",
    // eslint-disable-next-line complexity
    value: function render() {
      var _this$state = this.state,
          posterUrl = _this$state.posterUrl,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      var _this$props = this.props,
          assetDocument = _this$props.assetDocument,
          autoload = _this$props.autoload,
          children = _this$props.children;

      if (!assetDocument || !assetDocument.status) {
        return null;
      }

      if (isLoading) {
        return _react.default.createElement("div", {
          className: this.props.className,
          style: this.props.style
        }, _react.default.createElement("div", {
          className: "SanityMuxPlayerInfoContainer"
        }, "Waiting for MUX to complete the file..."));
      }

      var showControls = autoload || this.state.showControls;

      if (this.props.showControls === false) {
        showControls = false;
      }

      var videoProps = (0, _omit.default)(this.props, handledPropNames);
      return _react.default.createElement("div", {
        className: this.props.className,
        style: this.props.style
      }, _react.default.createElement("div", {
        ref: this.videoContainer
      }, _react.default.createElement("video", _extends({
        style: {
          display: 'block'
        } // Needs to be here to avoid 1px gap in the bottom of controls
        ,
        onClick: this.handleVideoClick,
        controls: showControls,
        muted: this.props.autoplay || this.props.muted // Force mute if autoplay (or it might not even work at all)
        ,
        autoPlay: this.props.autoplay,
        ref: this.video,
        poster: posterUrl
      }, videoProps))), error && _react.default.createElement("div", {
        className: "SanityMuxPlayerInfoContainer SanityMuxPlayerError"
      }, "There was an error loading this video (", error.type, ")."), children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    // eslint-disable-next-line complexity
    value: function getDerivedStateFromProps(nextProps) {
      var source = null;
      var posterUrl = null;
      var isLoading = true;
      var assetDocument = nextProps.assetDocument,
          poster = nextProps.poster;

      if (assetDocument && assetDocument.status === 'preparing') {
        isLoading = 'MUX is processing the video';
      }

      if (assetDocument && assetDocument.status === 'ready') {
        isLoading = false;
      }

      if (assetDocument && assetDocument.playbackId) {
        source = "https://stream.mux.com/".concat(assetDocument.playbackId, ".m3u8"); // Load video poster only if explictly requested.

        if (poster === true) {
          posterUrl = (0, _getPosterSrc.default)(assetDocument.playbackId, {
            time: assetDocument.thumbTime || 1,
            fitMode: 'preserve'
          });
        }
      }

      if (assetDocument && typeof assetDocument.status === 'undefined') {
        isLoading = false;
      }

      if (typeof poster === "string") {
        posterUrl = poster;
      }

      return {
        isLoading: isLoading,
        source: source,
        posterUrl: posterUrl
      };
    }
  }]);

  return SanityMuxPlayer;
}(_react.Component);

_defineProperty(SanityMuxPlayer, "defaultProps", {
  autoload: true,
  autoplay: false,
  className: '',
  height: '',
  loop: false,
  muted: false,
  showControls: true,
  style: {
    width: '100%',
    height: 'auto'
  },
  width: '100%',
  poster: true
});

SanityMuxPlayer.propTypes = propTypes;
var _default = SanityMuxPlayer;
exports.default = _default;