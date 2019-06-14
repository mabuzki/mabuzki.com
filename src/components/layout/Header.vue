<template>
<header class="navbar is-fixed-top">
	<div id="specialShadow" class="bd-special-shadow"></div>
	<div class="container">
		<div class="navbar-brand is-hidden-desktop">
			<router-link class="navbar-item link-user-avatar" :to="{name:'u', params: {uid: userId}}" v-if="userId">
				<img v-bind:src="userAvatar" class="image is-36x36 avatar">
			</router-link>

			<router-link class="navbar-item" to="/">首页</router-link>
			<router-link class="navbar-item" to="/articles">文章</router-link>

			<div class="tablet-btn" v-if="userId">
				<div class="navbar-item" v-if="this.$store.state.showBtnPublish">
					<a class="button is-link link-draft is-rounded"
						@click.stop="handleBtnPublish()"
						:class="{'is-loading': BtnPublishisLoading}">
						<span class="icon">
							<i class="iconfont">&#xe61d;</i>
						</span>
						<span>立即发布</span>
					</a>
				</div>

				<div class="navbar-item is-hoverable" v-else>
					<router-link class="button is-link link-draft is-rounded" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>
			</div>

			<!-- <div id="navbarBurger"
				class="navbar-burger burger"
				data-target="navMenu"
				@click="handleModalLoginOpen()"
				v-else>
				<span></span>
				<span></span>
				<span></span>
			</div> -->

			<a
				class="navbar-item is-right"
				style="margin-left: auto"
				@click="handleModalLoginOpen()"
				v-else>
				登录/注册
			</a>
		</div>

		<div id="navMenu" class="navbar-menu">
			<div class="navbar-start">
				<router-link class="navbar-item" to="/">首页</router-link>
				<router-link class="navbar-item" to="/articles">文章</router-link>
			</div>

			<div class="navbar-end" v-if="userId">

				<!--div class="navbar-item">
					<div class="field">
						<p class="control has-icons-right has-input-search">
							<span class="icon is-small is-right" >
								<i class="fa fa-search"></i>
							</span>
							<input class="input search" type="text" placeholder="搜索">
						</p>
					</div>
				</div-->

				<div class="navbar-item has-dropdown is-hoverable is-right">
					<router-link class="navbar-item link-user" :to="{name:'u', params: {uid: userId}}">
						<img v-bind:src="userAvatar" class="image is-36x36 avatar">
					</router-link>

					<div class="navbar-dropdown">
						<router-link class="navbar-item link-user" :to="{name:'u', params: {uid: userId}}">{{ userName }}</router-link>
						<hr class="navbar-divider">
						<!-- <router-link to="/message" class="navbar-item">
							消息
							<span class="ui text">
								51未读
							</span>
						</router-link> -->
						<router-link to="/setting/profile" class="navbar-item">资料</router-link>
						<router-link to="/setting/account" class="navbar-item">设置</router-link>

						<hr class="navbar-divider">
						<a class="navbar-item"
							@click="handleModalLogoutOpen()">登出</a>
					</div>
				</div>

				<div class="navbar-item" v-if="this.$store.state.showBtnPublish">
					<a class="button is-link link-draft is-rounded"
						@click.stop="handleBtnPublish()"
						:class="{'is-loading': BtnPublishisLoading}">
						<span class="icon">
							<i class="iconfont">&#xe61d;</i>
						</span>
						<span>立即发布</span>
					</a>
				</div>

				<div class="navbar-item is-hoverable" v-else>
					<router-link class="button is-link link-draft is-rounded" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>

			</div>

			<div class="navbar-end" v-else>
				<a title="登录" class="navbar-item modal_btn login_btn"
					@click="handleModalLoginOpen()">登录</a>

				<a title="注册" class="navbar-item modal_btn login_register"
					@click="handleModalRegisterOpen()">注册</a>

			</div>
		</div>
	</div>
</header>
</template>

<script>
import Vue from 'vue'
import ComponentLogin from '@/components/auth/login.vue'
import ComponentRegister from '@/components/auth/register.vue'
import ComponentLogout from '@/components/auth/logout.vue'
import ComponentNavList from '@/components/layout/NavList.vue'

Vue.component('tab-home', { 
	template: `<div>Home component</div>`
})

export default {
	data () {
		return {
			userName: this.$store.state.userinfo.name,
			userId: this.$store.state.userinfo.id,
			userAvatar: this.$store.state.userinfo.avatar + '!avatar_small',
			needverify: this.$store.state.userinfo.needverify,
			BtnPublishisLoading: false
		}
	},
	computed: {
		userStatus() {
			let userinfo = {
				id: this.$store.state.userinfo.id,
				name: this.$store.state.userinfo.name,
				token: this.$store.state.userinfo.token,
				avatar: this.$store.state.userinfo.avatar,
				userCacheKey: this.$store.state.userinfo.userCacheKey
			}
			return userinfo
		}
	},
	watch: {
		userStatus: function (_new) {
			if (_new.id) {
				this.userId = _new.id
				this.userName = _new.name
				// this.userAvatar = this.GLOBAL.avatar + _new.avatar + '!avatar_small'
				this.userAvatar = _new.avatar + '!avatar_small'
			} else {
				this.userId = null
				this.userName = null
				this.userAvatar = null
			}
		}
	},
	mounted () {
		this.$bus.on('handleModalLoginOpen', () => {
			this.$modal.show(ComponentLogin, {
				text: ''
			}, {
				name: 'modalLogin',
				classes: 'modal-login',
				draggable: false,
				adaptive: true,
				height: 'auto',
				clickToClose: false
			})
			this.$store.commit('clearUser')//清空用户数据
		})

		this.$bus.on('handleModalLogoutOpen', () => {
			this.handleModalLogoutOpen ()
		})

		this.$bus.on('handleModalLoginClose', (time) => {
			let _time = time ? 1500 : time
			let __self = this
			setTimeout(() => {
				__self.$modal.hide('modalLogin')
			}, _time)
		})

		this.$bus.on('swtichModalRegister', () => {//登录页面转入注册并关闭后层LoginModal
			this.handleModalRegisterOpen()
			setTimeout(() => {
				this.$modal.hide('modalLogin')
			}, 300)
		})

		this.$bus.on('changeUserStatus', (data) => {//注册成功后控制用户状态
			if (data.origin == 'register') {
				setTimeout(() => {
					this.$modal.hide('modalRegister')
				}, 1500)
			} else {
				this.$bus.emit('handleModalLoginClose')
			}
		})
	},
	methods: {
		handleModalLoginOpen () {//弹出modal login页面
			this.$modal.show(ComponentLogin, {
				text: ''
			}, {
				name: 'modalLogin',
				classes: 'modal-login',
				draggable: false,
				adaptive: true,
				height: 'auto',
				clickToClose: false
			})
		},
		handleModalNavListOpen () {//弹出modal 快捷导航
			this.$modal.show(ComponentNavList, {
				text: ''
			}, {
				name: 'modalNavList',
				classes: 'modal-nav-list',
				draggable: false,
				adaptive: true,
				height: 'auto',
				clickToClose: false
			})
		},
		handleBtnPublish () {
			this.$bus.emit('handleDraftPublish')
		},
		handleModalRegisterOpen () {
			this.$modal.show(ComponentRegister, {
				text: ''
			}, {
				name: 'modalRegister',
				classes: 'modal-register',
				draggable: false,
				adaptive: true,
				height: 'auto',
				clickToClose: false
			})
		},
		handleModalLogoutOpen () {
			this.$modal.show(ComponentLogout, {
				text: ''
			}, {
				name: 'modalLogout',
				classes: 'modal-logout',
				draggable: false,
				adaptive: true,
				height: 'auto',
				clickToClose: false
			})
		}
	}
}
</script>

