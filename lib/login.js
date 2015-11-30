'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsRequest = require('./utils/request');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

exports['default'] = function (config, hooks) {

	var appid = config.appid;
	var appsecret = config.appsecret;

	var redirect_uri = config.url; //重定向地址

	var urls = {
		access_token: 'https://api.weixin.qq.com/sns/oauth2/access_token',
		check_token: 'https://api.weixin.qq.com/sns/auth',
		refresh_token: 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
		user_info: 'https://api.weixin.qq.com/sns/userinfo'
	};
};

module.exports = exports['default'];