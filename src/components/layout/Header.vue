<template>
<header class="navbar">
	<div id="specialShadow" class="bd-special-shadow"></div>
	<div class="container">
		<div class="navbar-brand is-hidden-desktop">
			<router-link class="navbar-item link-user-avatar" :to="{name:'u', params: {uid: userId}}" v-if="userId">
				<img v-bind:src="userAvatar" class="image is-36x36 avatar">
			</router-link>

			<router-link class="navbar-item"  to="/">首页</router-link>
			<router-link class="navbar-item"  to="/hire-me">Hire Me</router-link>

			<div class="tablet-btn" v-if="userId">
				<div class="navbar-item" v-if="navbarShowBtnDraft">
					<router-link class="button is-link link-draft is-rounded" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>

				<div class="navbar-item is-hoverable" v-if="navbarShowBtnPublish">
					<a class="button is-link link-draft is-rounded"
						@click="handleBtnPublish()"
						:class="{'is-loading': BtnPublishisLoading}">
						<span class="icon">
							<i class="iconfont">&#xe61d;</i>
						</span>
						<span>立即发布</span>
					</a>
				</div>
			</div>
			

			<div id="navbarBurger"
				class="navbar-burger burger"
				data-target="navMenu"
				@click="handleModalLoginOpen()"
				v-else>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div id="navMenu" class="navbar-menu">
			<div class="navbar-start">
				<router-link class="navbar-item"  to="/">首页</router-link>
				<router-link class="navbar-item"  to="/hire-me">Hire Me</router-link>
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

				<div class="navbar-item" v-if="navbarShowBtnDraft">
					<router-link class="button is-link link-draft is-rounded" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>

				<div class="navbar-item is-hoverable" v-if="navbarShowBtnPublish">
					<a class="button is-link link-draft is-rounded"
						@click="handleBtnPublish()"
						:class="{'is-loading': BtnPublishisLoading}">
						<span class="icon">
							<i class="iconfont">&#xe61d;</i>
						</span>
						<span>立即发布</span>
					</a>

					<!-- <div class="navbar-dropdown">
						<a class="navbar-item" >私密发布</a>
						<a class="navbar-item" >保存草稿</a>
						<hr class="navbar-divider">
						<div class="navbar-item">
							<div>
								<p class="is-size-6-desktop">
									<strong>alpha</strong>
								</p>
								<small>
									<a class="bd-view-all-versions" href="#">mabuzki</a>
								</small>
							</div>
						</div>
					</div> -->
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
import ComponentLogin from '@/components/auth/login.vue'
import ComponentRegister from '@/components/auth/register.vue'
import ComponentLogout from '@/components/auth/logout.vue'
import ComponentNavList from '@/components/layout/NavList.vue'

export default {
	data () {
		return {
			userName: this.$store.state.userinfo.name,
			userId: this.$store.state.userinfo.id,
			navbarShowBtnDraft: true,
			navbarShowBtnPublish: false,
			userAvatar: this.GLOBAL.avatar + this.$store.state.userinfo.id + '/1',
			BtnPublishisLoading: false
		}
	},
	beforeMount () {
		// localStorage.setItem('userid', '')
		// localStorage.setItem('username', '')
		// localStorage.setItem('token', '')
		// if (this.$store.state.token && this.$store.state.userid) {
		// 	this.userId = this.$store.state.userid
		// 	this.userName = this.$store.state.username
		// 	this.userAvatar = this.GLOBAL.avatar + this.$store.state.userid + '/0'
		// }
	},
	computed: {
		userStatus() {
			let userinfo = {
				id: this.$store.state.userinfo.id,
				name: this.$store.state.userinfo.name,
				token: this.$store.state.userinfo.token
			}
			return userinfo
		}
	},
	watch: {
		userStatus: function (_new) {
			if (_new.id) {
				this.userId = _new.id
				this.userName = _new.name
				this.userAvatar = this.GLOBAL.api + '/avatar/' + _new.id + '/1'
			} else {
				this.userId = null
				this.userName = null
				this.userAvatar = null
			}
		}
	},
	mounted () {
		this.$bus.on('handleNavbarShowBtnDraft', (action) => {
			if (action === 'hide') {
				this.navbarShowBtnDraft = false
			} else {
				this.navbarShowBtnDraft = true
			}
		})
		this.$bus.on('handleNavbarShowBtnPublish', (action) => {
			if (action === 'show') {
				this.navbarShowBtnPublish = true
			} else {
				this.navbarShowBtnPublish = false
			}
		})

		this.$bus.on('handleNavbarLoginStatus', (action) => { // 注册call
			if (action === 'signed') {
				this.userId = localStorage.getItem('userid')
				this.userName = localStorage.getItem('username')
				this.userAvatar = this.GLOBAL.api + '/avatar/' + localStorage.getItem('userid') + '/0'
			} else {
				this.$store.commit('clearUser')
				this.userId = ''
			}
		})

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

		this.$bus.on('handleModalLoginClose', () => {
			let __self = this
			setTimeout(() => {
				__self.$modal.hide('modalLogin')
			}, 1500)
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
	beforeDestroy() {
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
