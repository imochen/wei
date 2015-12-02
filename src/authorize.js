import { get , post } from './utils/request';


let urls = {
	authorize : 'https://open.weixin.qq.com/connect/oauth2/authorize',
	access_token : 'https://api.weixin.qq.com/sns/oauth2/access_token',
	check_token : 'https://api.weixin.qq.com/sns/auth',
	refresh_token : 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
	user_info : 'https://api.weixin.qq.com/sns/userinfo'
}
let utils = {

	serialize( url , paramObj ){
		let paramStr = '';
		for( let name in paramObj ){
			if( paramObj.hasOwnProperty(name) ){
				paramStr += '&'+ name +'=' + paramObj[name];
			}
		}
		paramStr = paramStr.replace(/^\&/,'?');
		return (url + paramStr);
	}

}

let authorize_url = ( appid , redirect_uri ) =>{
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ encodeURIComponent(redirect_uri) +'&response_type=code&scope=snsapi_userinfo#wechat_redirect'
}

let run = async ( config , hooks ) =>{

	let appid = config.appid;
	let appsecret = config.appsecret;
	let code = config.code;

	hooks = hooks || {}; //容错

	let access_token_data;

	try{
		access_token_data = await get( urls.access_token , {
			appid : appid,
			secret : appsecret,
			code : code,
			grant_type : 'authorization_code'
		});
	}catch(e){
		console.log(e);
	}

	if( !access_token_data.access_token ){
		return {
			errno : -1,
			errmsg : 'get access_token filed'
		};
	}

	let userinfo;

	if( hooks.check ){
		userinfo = await hooks.check( access_token_data );
	}

	if( !userinfo ){
		
		let access_token = access_token_data.access_token;
		let openid = access_token_data.openid;

		let check_token_data;
		try{
			check_token_data = await get( urls.check_token , {
				openid : openid,
				access_token : access_token
			});
		}catch(e){
			console.log(e);
		}

		if( check_token_data.errcode !== 0 ){
			let refresh_token_data;
			try{
				refresh_token_data = await get( urls.refresh_token ,{
					appid : appid,
					refresh_token : access_token_data.refresh_token
				});
			}catch(e){
				console.log(e);
			}
			access_token = refresh_token_data.access_token;
		}

		try{
			userinfo = await get( urls.user_info , {
				openid : openid,
				access_token : access_token
			});
		}catch(e){
			console.log(e);
		}

	}

	return userinfo;
}

export default { authorize_url , run };