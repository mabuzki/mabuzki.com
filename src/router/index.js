import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	linkActiveClass: 'active-link',
	linkExactActiveClass: 'is-selected',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {        
				from.meta.savedPosition = document.body.scrollTop;      
			}        
			return { x: 0, y: to.meta.savedPosition || 0 } 
		}
	},
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/components/index')
		},
		{
			path: '/new',
			name: 'new',
			component: () => import('@/components/page/new.vue')
		},
		{
			path: '/lab',
			component: () => import('@/components/page/lab.vue')
		},
		{
			path: '/u/:uid',
			name: 'u',
			component: () => import('@/components/page/user.vue'),
			meta: {
				keepAlive: true,
			}
		},
		{
			path: '/message',
			name: 'message',
			component: () => import('@/components/page/message.vue')
		},
		{
			name: 'setting',
			path: '/setting',
			component: () => import('@/components/setting/main.vue'),
			children: [
				{
					path: 'account',
					component: () => import('@/components/setting/account.vue')
				},
				{
					path: 'profile',
					component: () => import('@/components/setting/profile.vue')
				},
				{
					path: 'verify',
					component: () => import('@/components/setting/verify.vue')
				}
			]
		},
		{
			path: '/articles',
			name: 'articles',
			component: () => import('@/components/page/articles.vue'),
			meta: {
				keepAlive: true,
			}
		},
		{
			path: '/article/:id',
			name: 'article',
			component: () => import('@/components/page/article.vue')
		},
		{
			path: '/draft',
			name: 'draft',
			component: () => import('@/components/page/draft.vue'),
			meta: {
				hideFooter: true,
			}
		},
		{
			path: '/changelog',
			component: () => import('@/components/page/changelog.vue')
		},
		{
			path: '/hire-me',
			component: resolve => require(['@/components/page/hire.vue'], resolve),
			meta: {
				hideHeader: true,
				hideFooter: true
			}
		},
		{ path: '*', component: { template: '<div>404</div>' } }
	]
})
