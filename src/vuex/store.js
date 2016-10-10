const Vue = require('vue');
const Vuex = require('vuex');
const Proxy = require('./modules/proxy');

Vue.use(Vuex);

module.exports = new Vuex.Store({
    modules: {
        Proxy
    },
    strict: process.env.NODE_ENV === 'development',
});