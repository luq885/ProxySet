const ProxySet = require('../proxyclass/proxyset');
const {dialog} = require('electron').remote;
const {
    SET_PROXY_STATE,
    SET_BYPASS,
} = require('./mutation-types');

const setProxyState = ({dispatch}, state) => {
    dispatch(SET_PROXY_STATE, state);
};

const setProxy = ({dispatch}, url, state) => {
    if (!state) {
        ProxySet.disableProxy().then((result) => {
            console.log(result);
            dispatch(SET_PROXY_STATE, state);
        }).catch((err) => {
            dialog.showErrorBox('', err.message);
        });
        return;
    }
    ProxySet.setProxy(url).then((result) => {
        console.log(result);
        dispatch(SET_PROXY_STATE, state);
    }).catch((err) => {
        dialog.showErrorBox('', err.message);
    });

};

const setByPass = ({dispatch}, byPass, modify) => {
    if (!modify) {
        dispatch(SET_BYPASS, byPass);
        return;
    }
    ProxySet.modifyByPass(byPass).then((result)=>{
        console.log(result);
        dispatch(SET_BYPASS, byPass);
    }).catch((err) => {
        dialog.showErrorBox('', err.message);
    });
};

module.exports = {
    setProxyState,
    setProxy,
    setByPass,
};