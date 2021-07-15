"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _excluded = ["children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function createComponentMock() {
  var mock = {};

  function ComponentMock(_ref) {
    var children = _ref.children,
        restProps = _objectWithoutProperties(_ref, _excluded);

    if (!restProps['data-testid']) {
      throw new Error('You are rendering a ComponentMock without a "data-testid" attribute. This is not allowed.');
    }

    var currentMock = {
      render: jest.fn(),
      callback: {}
    };
    currentMock.render(restProps, children);
    Object.keys(restProps).forEach(function (key) {
      if (typeof restProps[key] === 'function') {
        currentMock.callback[key] = restProps[key];
      }
    });
    mock[restProps['data-testid']] = currentMock;
    return /*#__PURE__*/_react["default"].createElement("div", null, children);
  }

  ComponentMock.mock = mock;
  return ComponentMock;
}

var _default = createComponentMock;
exports["default"] = _default;