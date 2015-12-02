'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _authorize = require('./authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _signature = require('./signature');

var _signature2 = _interopRequireDefault(_signature);

exports['default'] = {
	sign: _signature2['default'].sign,
	token: _signature2['default'].token,
	authorize_url: _authorize2['default'].authorize_url,
	authorize: _authorize2['default'].run
};
module.exports = exports['default'];