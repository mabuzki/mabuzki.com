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
			component: () => import('@/components/index'),
			meta: {
				showFooter: true
			}
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
			beforeEnter: (to, from, next) => {
				next({path: '/articles/1'})
			}
		},
		{
			path: '/articles/:page',
			name: 'articles',
			component: () => import('@/components/page/articles.vue'),
			meta: {
				keepAlive: true,
			}
		},
		{
			path: '/article/:id',
			name: 'article',
			component: () => import('@/components/page/article.vue'),
			beforeEnter: (to, from, next) => {
				// let ua = navigator.userAgent
				// to.meta.showReply = false
				// let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
				// let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
				// let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
				// let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
				// if ( android || ipad || ipod || iphone) {
				// 	to.meta.showReply = true
				// }
				next()
			},
			meta: {
				hideFooter: true
			}
		},
		{
			path: '/draft',
			name: 'draft',
			component: () => import('@/components/page/draft.vue'),
			meta: {
				hideFooter: true
			}
		},
		{
			path: '/changelog',
			component: () => import('@/components/page/changelog.vue')
		},
		{
			path: '/hire-me',
			// component: resolve => require(['@/components/page/hire.vue'], resolve),
			component:  () => import('@/components/page/hire.vue'),
			meta: {
				hideHeader: true,
				hideFooter: true
			}
		},
		{ path: '*', component: { template: '<div>404</div>' } }
	]
})
