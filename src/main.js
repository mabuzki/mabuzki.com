// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import _ from 'lodash'
import utils from './utils'
import global_ from './components/global'
import axios from 'axios'
import VueBus from 'vue-bus'
import VModal from 'vue-js-modal'
import lazysizes from 'lazysizes'
import Toasted from 'vue-toasted'

import './assets/iconfont/iconfont.css'
import './sass/app.scss'

window.Vue = Vue

console.log(process.env)

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
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

axios.interceptors.request.use((config) => {
	if (!localStorage.getItem('token') && config.method === 'post') {
		config.headers.Authorization = ''
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
	if(!response.data.success) {
		if(response.data.needlogin && response.request.responseURL.indexOf('logout') == -1) {//需要重新登录并且不是退出post
			Vue.prototype.$toasted.show('需要重新登录')
			Vue.prototype.$bus.emit('handleModalLoginOpen')//开启登录modal
		}
	}
	return response
}, (error) => {
	// 处理响应失败
	switch (error.response.status) {
	// 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
	case 401:
		global_.notice.force({ type: 'error', text: error.response.data.info, callback: () => { console.log('test') } })
		break
	// 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
	case 400:
		return this.$Message.error(error.response.data.error)
	}
	return Promise.reject(error)
})

Vue.prototype.$http = axios
Vue.prototype.$utils = utils

router.beforeEach((to, from, next) => {
	console.log('test')
	if (!localStorage.getItem('token') && !localStorage.getItem('userid')) {
		if (to.path === '/setting/account' || to.path === '/setting/profile' || to.path === '/draft') {
			next({path: '/login'})
		}
	}

	if (localStorage.getItem('token') !== null && localStorage.getItem('userid') !== null) {
		if (to.path === '/login' || to.path === '/sign-up') {
			next({path: '/'})
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
