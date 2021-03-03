import { Cookie } from "./cookies";


describe( 'Cookie', ()=>{
	beforeEach(()=>{
		Object.defineProperty(window.document, 'cookie', {
			writable: true,
			value: 'myCookie=anytastefulcookie',
		});
	});

	it( 'should set cookie fields properly', ()=>{
		Cookie.setFields({
			aTestCookie: 'this is the contens of a test cookie',
			domain: 'domain',
			expires: new Date( Date.UTC( 2000, 1, 1 ) ),
			maxAge: 2365691,
			secure: true,
			samesite: 'strict'// prevents the browser from sending this cookie along with cross-site requests. Possible values for the flag are lax or strict.
		})
		expect( window.document.cookie ).toEqual('aTestCookie=this is the contens of a test cookie;domain=domain;expires=Tue, 01 Feb 2000 00:00:00 GMT;maxAge=2365691;secure=true;samesite=strict');
	});

	it( 'should return cookie value', ()=>{
		expect( Cookie.get( 'myCookie' ) ).toEqual( 'anytastefulcookie' );
	});

	it('should return falsy if cookie not set', ()=>{
		expect( Cookie.get( 'nonExistingCookie' ) ).toBeFalsy();
	})
});
