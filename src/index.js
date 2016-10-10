const App = require('./componets/App');
const router = require('./router');

router.redirect({
    '*': '/main'
});

router.start(App, 'app');