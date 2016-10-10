const getProxyUrl = ({Proxy}) => {
    return Proxy.proxyUrl;
};

const getProxyIP = ({Proxy}) => {
    return Proxy.proxyIP;
};

const getProxyPort = ({Proxy}) => {
    return Proxy.proxyPort;
};

const getProxyState = ({Proxy}) => {
    return Proxy.isEnabled;
};

const getProxyByPass = ({Proxy}) => {
    return Proxy.byPass;
};

const getIsHttp = (Proxy) =>{
    return Proxy.isHttp;
};

const getIsHttps = (Proxy) =>{
    return Proxy.isHttps;
};

module.exports = {
    getProxyUrl,
    getProxyIP,
    getProxyPort,
    getProxyState,
    getProxyByPass,
    getIsHttp,
    getIsHttps,
};