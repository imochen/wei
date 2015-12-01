'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _authorize = require('./authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _signature = require('./signature');

var _signature2 = _interopRequireDefault(_signature);

_authorize2['default']({}, {});

exports.authorize = _authorize2['default'];
exports.signature = _signature2['default'];