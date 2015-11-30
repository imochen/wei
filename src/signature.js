import { get } from './utils/request';
import jssha from 'jssha';

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
export default async ( config , hooks ) => {

	let appid = config.appid;
	let appsecret = config.appsecret;

	let utils = {

		createNonceStr(){
			return Math.random().toString(36).substr(2,15);
		},
		createTimestamp(){
			return parseInt( new Date().getTime() / 1000 ) + '';
		},
		raw( args){
			let keys = Object.keys( args );
			keys = keys.sort();
			let newArgs = {};
			keys.forEach((key)=>{
				newArgs[key.toLowerCase()] = args[key];
			});
			let string = '';
			for( let k in newArgs){
				string += '&' + k + '=' + newArgs[k];
			}
			string = string.substr(1);
			return string;
		},
		signature( jsapi_ticket ){
			let ret = {
				jsapi_ticket : jsapi_ticket,
				nonceStr : utils.createNonceStr(),
				timestamp : utils.createTimestamp(),
				url : config.url
			}
			let string = raw(ret);
			let shaObj = new jssha( string , 'TEXT');
			ret.signature = shaObj.getHash('SHA-1','HEX');
			return ret;
		}
	}


	let urls = {
		token : 'https://api.weixin.qq.com/cgi-bin/token',
		ticket : 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
	}

	let ticket = await hooks.ticket();

	if( ticket.length === 0 ){

		let token = await get( urls.token ,{
			grant_type : 'client_credential',
			appid : appid,
			secret : appsecret
		});

		ticket = await get( urls.ticket , {
			access_token : token,
			type : 'jsapi'
		});

		hooks.save( token , ticket );
	}

	return utils.signature( ticket );

}