import { get , post } from './utils/request';
import http from 'http';


export default ( config , hooks )=>{

	let appid = config.appid;
	let appsecret = config.appsecret;

	let redirect_uri = config.url; //重定向地址

	let urls = {
		access_token : 'https://api.weixin.qq.com/sns/oauth2/access_token',
		check_token : 'https://api.weixin.qq.com/sns/auth',
		refresh_token : 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
		user_info : 'https://api.weixin.qq.com/sns/userinfo'
	}

}