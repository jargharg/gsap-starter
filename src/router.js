import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import View2 from './views/View2.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/view2',
			name: 'view2',
			component: View2,
		},
	],
});
