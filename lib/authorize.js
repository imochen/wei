'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

exports.__esModule = true;

var _this = this;

var _utilsRequest = require('./utils/request');

var urls = {
	authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize',
	access_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',
	check_token: 'https://api.weixin.qq.com/sns/auth',
	refresh_token: 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
	user_info: 'https://api.weixin.qq.com/sns/userinfo'
};
var utils = {

	serialize: function serialize(url, paramObj) {
		var paramStr = '';
		for (var _name in paramObj) {
			if (paramObj.hasOwnProperty(_name)) {
				paramStr += '&' + _name + '=' + paramObj[_name];
			}
		}
		paramStr = paramStr.replace(/^\&/, '?');
		return url + paramStr;
	}

};

var authorize_url = function authorize_url(appid, redirect_uri) {
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
};

var run = function run(config, hooks) {
	var appid, appsecret, code, access_token_data, userinfo, access_token, openid, check_token_data, refresh_token_data;
	return _regeneratorRuntime.async(function run$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				appid = config.appid;
				appsecret = config.appsecret;
				code = config.code;

				hooks = hooks || {}; //容错

				access_token_data = undefined;
				context$1$0.prev = 5;
				context$1$0.next = 8;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.access_token, {
					appid: appid,
					secret: appsecret,
					code: code,
					grant_type: 'authorization_code'
				}));

			case 8:
				access_token_data = context$1$0.sent;
				context$1$0.next = 14;
				break;

			case 11:
				context$1$0.prev = 11;
				context$1$0.t0 = context$1$0['catch'](5);

				console.log(context$1$0.t0);

			case 14:
				if (access_token_data.access_token) {
					context$1$0.next = 16;
					break;
				}

				return context$1$0.abrupt('return', {
					errno: -1,
					errmsg: 'get access_token filed'
				});

			case 16:
				userinfo = undefined;

				if (!hooks.check) {
					context$1$0.next = 21;
					break;
				}

				context$1$0.next = 20;
				return _regeneratorRuntime.awrap(hooks.check(access_token_data));

			case 20:
				userinfo = context$1$0.sent;

			case 21:
				if (userinfo) {
					context$1$0.next = 55;
					break;
				}

				access_token = access_token_data.access_token;
				openid = access_token_data.openid;
				check_token_data = undefined;
				context$1$0.prev = 25;
				context$1$0.next = 28;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.check_token, {
					openid: openid,
					access_token: access_token
				}));

			case 28:
				check_token_data = context$1$0.sent;
				context$1$0.next = 34;
				break;

			case 31:
				context$1$0.prev = 31;
				context$1$0.t1 = context$1$0['catch'](25);

				console.log(context$1$0.t1);

			case 34:
				if (!(check_token_data.errcode !== 0)) {
					context$1$0.next = 46;
					break;
				}

				refresh_token_data = undefined;
				context$1$0.prev = 36;
				context$1$0.next = 39;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.refresh_token, {
					appid: appid,
					refresh_token: access_token_data.refresh_token
				}));

			case 39:
				refresh_token_data = context$1$0.sent;
				context$1$0.next = 45;
				break;

			case 42:
				context$1$0.prev = 42;
				context$1$0.t2 = context$1$0['catch'](36);

				console.log(context$1$0.t2);

			case 45:
				access_token = refresh_token_data.access_token;

			case 46:
				context$1$0.prev = 46;
				context$1$0.next = 49;
				return _regeneratorRuntime.awrap(_utilsRequest.get(urls.user_info, {
					openid: openid,
					access_token: access_token
				}));

			case 49:
				userinfo = context$1$0.sent;
				context$1$0.next = 55;
				break;

			case 52:
				context$1$0.prev = 52;
				context$1$0.t3 = context$1$0['catch'](46);

				console.log(context$1$0.t3);

			case 55:
				return context$1$0.abrupt('return', userinfo);

			case 56:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this, [[5, 11], [25, 31], [36, 42], [46, 52]]);
};

exports['default'] = { authorize_url: authorize_url, run: run };
module.exports = exports['default'];