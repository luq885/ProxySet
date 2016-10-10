const Vue = require('vue');
const VueRouter = require('vue-router');

const Main = require('./componets/main');
const ByPass = require('./componets/byPass');

Vue.use(VueRouter);

const config = {
    '/main': {
        component: Main,
    },
    '/bypass': {
        component: ByPass,
    }
};

let router = new VueRouter();

router.map(config);

module.exports = router;
