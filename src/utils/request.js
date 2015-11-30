import urllib from 'urllib';

let _request = ( type , url , data , options ) => {
	return new Promise((resolve , reject)=>{
		urllib.request( url , {
			method : type,
			timeout : options.timeout || 10000,
			data : data
		},( err , data , res )=>{
			if( !err ){
				resolve( JSON.parse( data.toString() ));
			}else{
				reject( options.errmsg || err );
			}
		});
	});
}

let post = ( url , data , options )=>{
	return _request( 'POST', url , data , options );
}

let get = ( url , data , options )=>{
	return _request( 'GET', url , data , options );
}

export { get , post };