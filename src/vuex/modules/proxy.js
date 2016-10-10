const {
    SET_BYPASS,
    SET_PROXY_STATE,
} = require('../mutation-types');

// 该模块的初始状态
const state = {
    proxyUrl: 'http://192.168.1.228:8123/pac',
    isEnabled: false,
    byPass: '',
};

// 相关的 mutations
const mutations = {
    [SET_BYPASS](state, byPass) {
        state.byPass = byPass;
    },
    [SET_PROXY_STATE](state, _state) {
        state.isEnabled = _state;
    },
};

module.exports = {
    state,
    mutations
};