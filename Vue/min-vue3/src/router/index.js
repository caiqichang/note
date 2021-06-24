import {createRouter, createWebHistory} from 'vue-router';
import VueConfig from '../../vue.config.js';

const routes = [
    
];

const router = createRouter({
    history: createWebHistory(VueConfig.publicPath),
    routes,
});

export default router;
