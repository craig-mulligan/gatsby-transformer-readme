'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require(`crypto`);
var readmeParser = require('readme-parser');

module.exports = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var node = _ref.node,
        getNode = _ref.getNode,
        loadNodeContent = _ref.loadNodeContent,
        boundActionCreators = _ref.boundActionCreators;
    var createNode, updateNode, content, data, objStr, contentDigest, readmeNode;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode, updateNode = boundActionCreators.updateNode;

            // We are only concerned with readmes

            if (!(node.name !== `README`)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            if (!(node.internal.mediaType !== `text/x-markdown`)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            _context.next = 7;
            return loadNodeContent(node);

          case 7:
            content = _context.sent;
            data = readmeParser(content);
            objStr = (0, _stringify2.default)(data);
            contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);
            readmeNode = (0, _extends3.default)({}, data, {
              id: `${node.id} >>> readme`,
              children: [],
              parent: node.id,
              internal: {
                contentDigest,
                type: `Readme`,
                mediaType: `application/json`,
                content: objStr
              }
            });

            // Add path to the markdown file path

            if (node.internal.type === `File`) {
              readmeNode.fileAbsolutePath = node.absolutePath;
            }

            node.children = node.children.concat([readmeNode.id]);
            updateNode(node);
            createNode(readmeNode);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function onNodeCreate(_x) {
    return _ref2.apply(this, arguments);
  }

  return onNodeCreate;
}();