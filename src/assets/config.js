var rootConfig = {
    path: '//tools.ipsebe.com/',
    indexUrl: '//www.ipsebe.com',
    cartUrl:'//cart.ipsebe.com',
    czUrl:'//cz.ipsebe.com',
    userUrl: '//user.ipsebe.com',
    payUrl: '//iprp.ipsebe.com',
    spUrl: '//sp.ipsebe.com',
    toolsUrl: '//tools.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0) {
	rootConfig = {
	    path: '//localhost:8083/cnsebe-tools-core/',
        indexUrl: '//localhost:8083/ipp',
        cartUrl:'//localhost:8083/portalsite-cnsebe',
        czUrl:'//localhost:8083/cz',
        userUrl: '//localhost:8083/user',
        payUrl: '//localhost:8083/pay',
        spUrl:'//localhost:8083/sp',
        toolsUrl: '//localhost:8083/tools'
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
        path: '//testtools.ipsebe.com/',
        indexUrl: '//testwww.ipsebe.com',
        cartUrl:'//testcart.ipsebe.com',
        czUrl:'//testcz.ipsebe.com',
        userUrl: '//testuser.ipsebe.com',
        payUrl: '//testiprp.ipsebe.com',
        spUrl:'//testsp.ipsebe.com',
        toolsUrl: '//testtools.ipsebe.com'
    };
}
if (location.host.indexOf('pre') === 0) {
	rootConfig = {
        path: '//pretools.ipsebe.com/',
        indexUrl: '//prewww.ipsebe.com',
        cartUrl:'//precart.ipsebe.com',
        czUrl:'//precz.ipsebe.com',
        userUrl: '//preuser.ipsebe.com',
        payUrl: '//preiprp.ipsebe.com',
        spUrl:'//presp.ipsebe.com',
        toolsUrl: '//pretools.ipsebe.com'
    };
}

window.CONFIG = rootConfig;




















































window.CONFIG = rootConfig;

export default rootConfig


















































