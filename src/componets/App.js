// const Main = require('./main');
const store = require('../vuex/store');
const router = require('../router');

module.exports = {
    template: `
    <header class="toolbar toolbar-header">
    <div class="toolbar-actions">
        <div class="btn-group">
        <button class="btn btn-default" v-bind:class="{ 'active': routerId === 0 }" @click="setRouter(0)">
            <span class="icon icon-home"></span>
        </button>
        <button class="btn btn-default" v-bind:class="{ 'active': routerId === 1 }" @click="setRouter(1)">
            <span class="icon icon-network"></span>
        </button>
        </div>
    </div>
    </header>
    <div class="main">
        <router-view></router-view>
        <!--<main></main>-->
    </div>
    <footer class="toolbar toolbar-footer">
        <h1 class="title"></h1>
    </footer>
    `,
    data: function () {
        return {
            routerId: 0,
        };
    },
    components: {
        // Main
    },
    ready: function () {

    },
    methods: {
        setRouter: function (id) {
            this.routerId = id;
            switch (id) {
            case 0:
                router.go('/main');
                break;
            case 1:
                router.go('/bypass');
                break;
            }
        }
    },
    store,
};