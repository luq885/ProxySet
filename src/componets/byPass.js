const getters = require('../vuex/getters');
const actions = require('../vuex/actions');
const ProxySet = require('../proxyclass/proxyset');

module.exports = {
    template: `
    <div class="form-group">
        <label>不通过代理的域名/IP:</label>
        <textarea class="form-control" rows="3" v-model="byPass"></textarea>
    </div>
    <div class="form-actions">
        <button @click="setByPass(proxyByPass,true)" class="btn btn-form btn-primary">OK</button>
    </div>
        `,
    vuex: {
        getters: {
            proxyByPass: getters.getProxyByPass,
        },
        actions: {
            setByPass: actions.setByPass,
        }
    },
    components: {
    },
    computed: {
        byPass: {
            get() {
                return this.proxyByPass;
            },
            set(val) {
                this.setByPass(val);
            }
        }
    },
    ready: function () {
        ProxySet.getByPass().then((result) => {
            this.setByPass(result);
        });
    },
    methods: {
    },
};