'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _urllib = require('urllib');

var _urllib2 = _interopRequireDefault(_urllib);

var _request = function _request(type, url, data, options) {
	options = options || {};
	return new _Promise(function (resolve, reject) {
		_urllib2['default'].request(url, {
			method: type,
			timeout: options.timeout || 60000,
			data: data
		}, function (err, data, res) {
			if (!err) {
				resolve(JSON.parse(data.toString()));
			} else {
				reject(options.errmsg || err);
			}
		});
	});
};

var post = function post(url, data, options) {
	return _request('POST', url, data, options);
};

var get = function get(url, data, options) {
	return _request('GET', url, data, options);
};

exports.get = get;
exports.post = post;