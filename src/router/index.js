import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	linkActiveClass: 'active-link',
	linkExactActiveClass: 'is-selected',
	routes: [
		{
			path: '/',
			name: 'index',
			component: resolve => require(['@/components/index'], resolve)
		},
		{
			path: '/new',
			component: resolve => require(['@/components/page/new.vue'], resolve)
		},
		{
			path: '/lab',
			component: resolve => require(['@/components/page/lab.vue'], resolve)
		},
		{
			path: '/hire-me',
			component: resolve => require(['@/components/page/hire.vue'], resolve)
		},
		{
			path: '/u/:uid',
			name: 'u',
			component: resolve => require(['@/components/page/user.vue'], resolve)
		},
		{
			path: '/message',
			name: 'message',
			component: resolve => require(['@/components/page/message.vue'], resolve)
		},
		{
			name: 'Setting',
			path: '/setting',
			component: resolve => require(['@/components/setting/main.vue'], resolve),
			children: [
				{
					path: 'account',
					component: resolve => require(['@/components/setting/account.vue'], resolve)
				},
				{
					path: 'profile',
					component: resolve => require(['@/components/setting/profile.vue'], resolve)
				}
			]
		},
		{
			path: '/article/:id',
			component: resolve => require(['@/components/page/article.vue'], resolve)
		},
		{
			path: '/draft',
			component: resolve => require(['@/components/page/draft.vue'], resolve)
		},
		{
			path: '/changelog',
			component: resolve => require(['@/components/page/changelog.vue'], resolve)
		},
		{ path: '*', component: { template: '<div>404</div>' } }
	]
})
