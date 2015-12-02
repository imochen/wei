'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _utilsRequest = require('./utils/request');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

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

exports['default'] = {

	authorize_url: function authorize_url(appid, redirect_uri) {
		return utils.serialize(urls.authorize, {
			appid: appid,
			response_type: 'code',
			scope: 'snsapi_userinfo',
			state: 'auth',
			'#wechat_redirect': ''
		});
	},

	run: function run(config, hooks) {
		var appid, appsecret, code, access_token_data, userinfo, access_token, openid, check_token_data, refresh_token_data, _userinfo;

		return _regeneratorRuntime.async(function run$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					appid = config.appid;
					appsecret = config.appsecret;
					code = config.code;
					context$1$0.next = 5;
					return _regeneratorRuntime.awrap(_utilsRequest.get(urls.access_token, {
						appid: appid,
						secret: appsecret,
						code: code,
						grant_type: 'authorization_code'
					}));

				case 5:
					access_token_data = context$1$0.sent;

					if (access_token_data.access_token) {
						context$1$0.next = 9;
						break;
					}

					hooks.retry();
					return context$1$0.abrupt('return', false);

				case 9:
					context$1$0.next = 11;
					return _regeneratorRuntime.awrap(hooks.check(access_token_data));

				case 11:
					userinfo = context$1$0.sent;

					if (userinfo) {
						context$1$0.next = 28;
						break;
					}

					access_token = access_token_data.access_token;
					openid = access_token_data.openid;
					context$1$0.next = 17;
					return _regeneratorRuntime.awrap(_utilsRequest.get(urls.check_token, {
						openid: openid,
						access_token: access_token
					}));

				case 17:
					check_token_data = context$1$0.sent;

					if (!(check_token_data.errcode !== 0)) {
						context$1$0.next = 23;
						break;
					}

					context$1$0.next = 21;
					return _regeneratorRuntime.awrap(_utilsRequest.get(urls.refresh_token, {
						appid: appid,
						refresh_token: access_token_data.refresh_token
					}));

				case 21:
					refresh_token_data = context$1$0.sent;

					access_token = refresh_token_data.access_token;

				case 23:
					context$1$0.next = 25;
					return _regeneratorRuntime.awrap(_utilsRequest.get(urls.user_info, {
						openid: openid,
						access_token: access_token
					}));

				case 25:
					_userinfo = context$1$0.sent;

					hooks.save(_userinfo);

					return context$1$0.abrupt('return', _userinfo);

				case 28:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}

};
module.exports = exports['default'];