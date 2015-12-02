# wei

> 用于微信签名和微信登陆的一个node模块

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