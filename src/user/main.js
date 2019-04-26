// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './../App'
import router from './../router'
import utils from './../utils'
import global_ from './../components/global'
import axios from 'axios'
import VueBus from 'vue-bus'
import VModal from 'vue-js-modal'
import lazysizes from 'lazysizes'
import Toasted from 'vue-toasted'

import './../assets/iconfont/iconfont.css'
import './../sass/app.scss'

window.Vue = Vue

Vue.use(Vuex)

//eslint-disable-next-line
const ver = '0.4.1'
window.ver = ver

const store = new Vuex.Store({
	state: {
		userinfo: {
			id: localStorage.getItem('userid'),
			name: localStorage.getItem('username'),
			token: localStorage.getItem('token'),
			needverify: localStorage.getItem('needverify'),
			avatarLocale: global_.api + '/avatar/' + localStorage.getItem('userid'),
			userCacheKey: global_.generateRandom(10, false)
		},
		showFooter: true,
		showBtnPublish: false
	},
	mutations: {
		setUser (state, data) {
			localStorage.setItem('userid', data.userid)
			localStorage.setItem('username', data.username)
			localStorage.setItem('token', data.token)
			localStorage.setItem('needverify', data.needverify)
			console.log(state.userinfo)
			state.userinfo.id = data.userid
			state.userinfo.name = data.username
			state.userinfo.token = data.token
			state.userinfo.needverify = data.needverify
			state.userinfo.avatarLocale = global_.api + '/avatar/' + data.userid
			state.userinfo.userCacheKey = global_.generateRandom(10, false)
		},
		clearUser (state) {
			localStorage.removeItem('userid')
			localStorage.removeItem('username')
			localStorage.removeItem('token')
			localStorage.removeItem('needverify')
			state.userinfo.id = null
			state.userinfo.name = null
			state.userinfo.token = null
			state.userinfo.needverify = false
			state.userinfo.avatarLocal = null
			state.userinfo.userCacheKey = null
		},
		setToken (state, token) {
			localStorage.setItem('token', token)
			state.userinfo.token = token
		},
		refreshCacheKey (state) {
			state.userinfo.userCacheKey = global_.generateRandom(10, false)
		},
		showFooter (state, boolean) {
			state.showFooter = boolean
		},
		showBtnPublish (state, boolean) {
			state.showBtnPublish = boolean
		}
	}
})

Vue.prototype.GLOBAL = global_
Vue.use(VueBus)
Vue.use(lazysizes)
Vue.use(VModal, {
	dynamic: true
})
Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000
})
// Vue.prototype._ = _

Vue.config.productionTip = false
axios.defaults.timeout = 10000
axios.defaults.baseURL = global_.api
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
	if (store.state.userinfo.token && config.method === 'post') {
		config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
		config.headers.common['Authorization'] = 'Bearer ' + store.state.userinfo.token
		if (!config.url.indexOf('upload')) {
			config.data = JSON.stringify(config.data)
		}
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
	if (response.data.info) {
		Vue.prototype.$toasted.show(response.data.info)
	}
	let newAuth = response.headers.authorization
	if(newAuth) {
		store.commit('setToken', newAuth)
		response.config.headers['Authorization'] = 'Bearer ' + newAuth
		return axios.request(response.config)
	}
	
	if(response.data.needlogin && response.request.responseURL.indexOf('logout') == -1) {//需要重新登录并且不是退出
		Vue.prototype.$bus.emit('handleModalLoginOpen')//开启登录modal
	}
	return response
}, (error) => {
	return Promise.reject(error)
})

Vue.prototype.$http = axios
Vue.prototype.$utils = utils

router.beforeEach((to, from, next) => {
	if (!store.state.userinfo.token && !store.state.userinfo.id) {//未登录
		if (to.path === '/setting' || to.path === '/draft') {
			next({path: '/needlogin'})
		}
	}

	if (store.state.userinfo.token && store.state.userinfo.id) {//登陆状态
		if (to.path === '/login' || to.path === '/sign-up') {
			next({path: '/'})
		}
		if (to.path === '/setting') {
			next({path: '/setting/profile'})
		}
	}
	next()
})

const VueVisual = require('vue-visual')
Vue.component('visual', VueVisual)

/* eslint-disable no-new */
new Vue({
	el: '#site-main',
	router,
	store,
	components: { App },
	template: '<App/>'
})

document.addEventListener('DOMContentLoaded', () => {
	let navLinkLab = document.querySelector('.link-lab')
	if (navLinkLab) {
		navLinkLab.onmouseover = () => {
			var span = navLinkLab.firstChild
			if (span.classList.contains('animated')) return false
			span.classList.add('animated')
			span.classList.add('tada')
			setTimeout(() => {
				span.classList.remove('animated')
				span.classList.remove('tada')
			}, 1000)
		}
	}
})