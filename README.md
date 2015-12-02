# wei

> 用于微信签名和微信登陆的一个node模块，该模块推荐配合 `ea7 async/await`使用，最初开发为在`thinkjs2.0`中使用，如在其他平台使用出现bug，可与本人取得联系。

### 安装
```javascript
npm install wei --save
```

### 用法简介

#### wei.token( appid , appsecret);
用于获取全局`token`和`jsapi-ticket`，方法返回Promise。可根据业务需要缓存结果。根据微信规定，该数据`7200s`内有效。请注意刷新。
格式如下:
```javascript
//正确返回结果
{
	token : token,
	ticket : ticket,
	timestamp : 时间戳秒数
}
//错误返回
{
	errno : -1,
	errmsg : 'get token or ticket failed'
}
```

### wei.sign( jsapi_ticket , url )
方法用于给url签名。第一个参数为`jsapi_ticket`，该参数应为`wei.token()`方法中获取的`ticket`，请根据业务需要进行缓存，勿频繁调用`wei.token`方法。该方法直接返回结果。使用示例：
```javascript
var sign = wei.sign( jsapi_ticket , url );

{
	jsapi_ticket : jsapi_ticket, //使用token换来的票据
	nonceStr: nonceStr, //随机字符串
	timestamp: timestamp, //时间戳
	url: url, //签名的url地址
	signature : signature //签名结果
}
```

### wei.authorize_url(  appid  , redirect_uri )
方法为静态方法，返回一个url，业务需要跳转至该url进行授权。示例
```javascript
var authorize_url = wei.authorize_url( appid ,redirect_uri );

http.redirect( authorize_url );
```

### wei.authorize(  config  , hooks )
使用该方法会进行一系列认证，直到拿到用户信息。因为openid是唯一的，所以在第一步请求拿到`access_token`后，会有一个`hook`。可以用该`hook`执行查库等逻辑，如果查到则给方法返回信息即可。未查到可不返回。或者返回空。使用示例。方法返回promise。
```javascript

wei.authorize({
	appid : appid,
	appsecret : appsecret,
	code : code //此处code可在授权后重定向的url上拿到。
},{
	check : function(){
		return ''; //此处可返回userinfo，如未查到则返回空。
	}
})

```