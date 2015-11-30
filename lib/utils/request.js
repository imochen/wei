'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _urllib = require('urllib');

var _urllib2 = _interopRequireDefault(_urllib);

var _request = function _request(type, url, data, options) {
	return new Promise(function (resolve, reject) {
		_urllib2['default'].request(url, {
			method: type,
			timeout: options.timeout || 10000,
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