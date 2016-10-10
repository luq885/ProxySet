const getters = require('../vuex/getters');
const actions = require('../vuex/actions');
const ProxySet = require('../proxyclass/proxyset');

module.exports = {
    template: `
    <div class="form-group">
        <label>代理地址: {{proxyUrl}}</label>
    </div>
    <div id="parent">
        <div id="item"><button @click="setProxy(proxyUrl, !proxyState)" class="btnSet" v-bind:class="{ 'disabled': !proxyState }"></button></div>
    </div>
        `,
    vuex: {
        getters: {
            proxyUrl: getters.getProxyUrl,
            proxyState: getters.getProxyState,
        },
        actions: {
            setProxy: actions.setProxy,
            setProxyState: actions.setProxyState
        }
    },
    components: {
    },
    ready: function () {
        ProxySet.getState(this.proxyUrl).then((result) => {
            this.setProxyState(result);
        });
    },
    methods: {

    },
};