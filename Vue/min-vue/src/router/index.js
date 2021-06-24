import Vue from 'vue';
import VueRouter from 'vue-router';
import VueConfig from '../../vue.config.js';

const routes = [
    
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: VueConfig.publicPath,
    routes,
});

export default router;
