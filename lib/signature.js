'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _this = this;

var _utilsRequest = require('./utils/request');

var _jssha = require('jssha');

var _jssha2 = _interopRequireDefault(_jssha);

var urls = {
	token: 'https://api.weixin.qq.com/cgi-bin/token',
	ticket: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
};

var utils = {

	createNonceStr: function createNonceStr() {
		return Math.random().toString(36).substr(2, 15);
	},
	createTimestamp: function createTimestamp() {
		return parseInt(new Date().getTime() / 1000) + '';
	},
	raw: function raw(args) {
		var keys = _Object$keys(args);
		keys = keys.sort();
		var newArgs = {};
		keys.forEach(function (key) {
			newArgs[key.toLowerCase()] = args[key];
		});
		var string = '';
		for (var k in newArgs) {
			string += '&' + k + '=' + newArgs[k];
		}
		string = string.substr(1);
		return string;
	},
	signature: function signature(jsapi_ticket, url) {
		var ret = {
			jsapi_ticket: jsapi_ticket,
			nonceStr: utils.createNonceStr(),
			timestamp: utils.createTimestamp(),
			url: url
		};
		var string = utils.raw(ret);
		var shaObj = new _jssha2['default'](string, 'TEXT');
		ret.signature = shaObj.getHash('SHA-1', 'HEX');
		return ret;
	}
};

var sign = function sign(ticket, url) {

	var ret = {
		jsapi_ticket: ticket,
		nonceStr: utils.createNonceStr(),
		timestamp: utils.createTimestamp(),
		url: url
	};

	var string = utils.raw(ret);
	var shaObj = new _jssha2['default'](string, 'TEXT');
	ret.signature = shaObj.getHash('SHA-1', 'HEX');
	return ret;
};

var token = function token(appid, appsecret) {
	var token_data, _token, ticket_data, _ticket;

	return _regeneratorRuntime.async(function token$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.prev = 0;
				context$1$0.next = 3;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.token, {
					grant_type: 'client_credential',
					appid: appid,
					secret: appsecret
				}));

			case 3:
				token_data = context$1$0.sent;
				_token = token_data.access_token;
				context$1$0.next = 7;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.ticket, {
					access_token: _token,
					type: 'jsapi'
				}));

			case 7:
				ticket_data = context$1$0.sent;
				_ticket = ticket_data.ticket;
				return context$1$0.abrupt('return', {
					token: _token,
					ticket: _ticket,
					timestamp: utils.createTimestamp()
				});

			case 12:
				context$1$0.prev = 12;
				context$1$0.t0 = context$1$0['catch'](0);

				console.log(context$1$0.t0);
				return context$1$0.abrupt('return', {
					errno: -1,
					errmsg: 'get token or ticket failed'
				});

			case 16:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this, [[0, 12]]);
};

exports['default'] = { sign: sign, token: token };
module.exports = exports['default'];