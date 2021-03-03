interface CookieFields {
	[x: string]: any;
	domain?: string;  // page url domain
	expires?: Date;   // cookie expire date
	maxAge?: number;  // cookie live in seconds
	secure?: boolean;	// cookie to only be transmitted over secure protocol as https
	samesite?: string;// prevents the browser from sending this cookie along with cross-site requests. Possible values for the flag are lax or strict.
}

export class Cookie {
	static wishToGoId = 'wishToGoId';
  // static lastViewedTrip = 'lastViewedTrip';

	static set( cookieName: string, value: string, expires?: Date ) {
		Cookie.setFields({
			[ cookieName ]: value,
			expires: expires || new Date( 2999, 1, 1 ),
			samesite: 'Strict',
// 			secure: false
		});
	}

	static setFields( data: CookieFields ) {

		let arr = Object.keys(data).map( ( key: string ) => {
			let val: string;
			let value = data[ key ];

			if ( value instanceof Date ) {
				val = value.toUTCString();
			}
			else {
				val = value;
			}

			return key + '=' + val;
		});

		document.cookie = arr.join(';');
	}

	static get( name: string ): string {
		return Cookie.keyValueStringToObj( document.cookie )[ name ];
	}

	static delete( name: string ) {
    document.cookie = name + '=; Max-Age=-99999999;';
	}

	/**
	* Converts a Key-Value string to an object.
	* @param  str a string with key value pair separated by the equal sing and every
	* 							entry separated by a semicolon. This is a sample String
	* 							'key=value;name=Peter;surname=Sellers'
	* @return     an object with key and values parsed
	*/
	static keyValueStringToObj( str: String ):{} {
		let arr = str.split(';');
		let obj = {};
		arr.forEach((value)=>{
			let equalSignPos = value.indexOf('=');
			obj[ value.slice( 0, equalSignPos ).trim() ] = value.slice( equalSignPos + 1 ).trim();
		});
		return obj;
	}

}
