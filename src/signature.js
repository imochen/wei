import { get } from './utils/request';
import jssha from 'jssha';


let urls = {
	token : 'https://api.weixin.qq.com/cgi-bin/token',
	ticket : 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
}

let utils = {

	createNonceStr(){
		return Math.random().toString(36).substr(2,15);
	},
	createTimestamp(){
		return parseInt( new Date().getTime() / 1000 ) + '';
	},
	raw(args){
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
	signature( jsapi_ticket , url ){
		let ret = {
			jsapi_ticket : jsapi_ticket,
			nonceStr : utils.createNonceStr(),
			timestamp : utils.createTimestamp(),
			url : url
		}
		let string = utils.raw(ret);
		let shaObj = new jssha( string , 'TEXT');
		ret.signature = shaObj.getHash('SHA-1','HEX');
		return ret;
	}
}

let sign = ( ticket , url ) => {

	let ret = {
		jsapi_ticket : ticket,
		nonceStr : utils.createNonceStr(),
		timestamp : utils.createTimestamp(),
		url : url
	}

	let string = utils.raw( ret );
	let shaObj = new jssha( string , 'TEXT');
	ret.signature = shaObj.getHash('SHA-1','HEX');
	return ret;

}

let token = async ( appid , appsecret ) => {

	try{
		let token_data = await get( urls.token,{
			grant_type : 'client_credential',
			appid : appid,
			secret : appsecret
		});
		let _token = token_data.access_token;

		let ticket_data = await get( urls.ticket,{
			access_token : _token,
			type : 'jsapi'
		});

		let _ticket = ticket_data.ticket;

		return {
			token : _token,
			ticket : _ticket,
			timestamp : utils.createTimestamp()
		}
	}
	catch(e){
		console.log(e);
		return {
			errno : -1,
			errmsg : 'get token or ticket failed'
		}
	}

}

export default { sign , token };