'use strict';

exports.__esModule = true;

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsRequest = require('./utils/request');

var _jssha = require('jssha');

var _jssha2 = _interopRequireDefault(_jssha);

/**
 * [微信jssdk签名]
 * 
 * config
 * {
 * 		appid : appid,
 * 		appsecret : appsecret,
 * 		url : 需要签名的地址
 * }
 * hooks
 * {
 * 		ticket : function(){} //返回存储的ticket，返回空字符串即刷新token
 * 		save : function( token , ticket ){} //保存 token 和 ticket 
 * }
 * 
 * 
 */

exports['default'] = function callee$0$0(config, hooks) {
	var appid, appsecret, utils, urls, ticket, token;
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				appid = config.appid;
				appsecret = config.appsecret;
				utils = {

					createNonceStr: function createNonceStr() {
						return Math.random().toString(36).substr(2, 15);
					},
					createTimestamp: function createTimestamp() {
						return parseInt(new Date().getTime() / 1000) + '';
					},
					raw: function raw(args) {
						var keys = Object.keys(args);
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
					signature: function signature(jsapi_ticket) {
						var ret = {
							jsapi_ticket: jsapi_ticket,
							nonceStr: utils.createNonceStr(),
							timestamp: utils.createTimestamp(),
							url: config.url
						};
						var string = raw(ret);
						var shaObj = new _jssha2['default'](string, 'TEXT');
						ret.signature = shaObj.getHash('SHA-1', 'HEX');
						return ret;
					}
				};
				urls = {
					token: 'https://api.weixin.qq.com/cgi-bin/token',
					ticket: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
				};
				context$1$0.next = 6;
				return regeneratorRuntime.awrap(hooks.ticket());

			case 6:
				ticket = context$1$0.sent;

				if (!(ticket.length === 0)) {
					context$1$0.next = 15;
					break;
				}

				context$1$0.next = 10;
				return regeneratorRuntime.awrap(_utilsRequest.get(urls.token, {
					grant_type: 'client_credential',
					appid: appid,
					secret: appsecret
				}));

			case 10:
				token = context$1$0.sent;
				context$1$0.next = 13;
				return regeneratorRuntime.awrap(_utilsRequest.get(urls.ticket, {
					access_token: token,
					type: 'jsapi'
				}));

			case 13:
				ticket = context$1$0.sent;

				hooks.save(token, ticket);

			case 15:
				return context$1$0.abrupt('return', utils.signature(ticket));

			case 16:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this);
};

module.exports = exports['default'];