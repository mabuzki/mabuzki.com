<template>
<header class="navbar">
	<div id="specialShadow" class="bd-special-shadow"></div>
	<div class="container">
		<div class="navbar-brand is-hidden-desktop">
			<router-link class="navbar-item link-user" :to="{name:'u', params: {uid: userId}}" v-if="userId">
				<img v-bind:src="userAvatar" class="image is-28x28 avatar">
			</router-link>
			
			<router-link class="navbar-item"  to="/">首页</router-link>

			<router-link class="navbar-item"  to="/hire-me">Hire Me</router-link>

			<div class="tablet-btn" v-if="userId">
				<div class="navbar-item" v-if="navbarShowBtnDraft">
					<router-link class="button is-link link-draft" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>

				<div class="navbar-item is-hoverable" v-if="navbarShowBtnPublish">
					<a class="button is-link link-draft"
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

				<!-- <div class="navbar-item has-dropdown is-hoverable">
					<router-link class="navbar-item link-lab" to="/tag">Tag</router-link>
					<div class="navbar-dropdown">
						<router-link class="navbar-item link-lab"  to="/lab">
							<span class="icon"><i class="iconfont">&#xe738;</i></span> vue
						</router-link>
						<router-link class="navbar-item link-lab"  to="/lab">
							<span class="icon"><i class="iconfont">&#xe738;</i></span> lab
						</router-link>
					</div>
				</div> -->

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
						<img v-bind:src="userAvatar" class="image is-28x28 avatar">
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
					<router-link class="button is-link link-draft" to="/draft">
						<span class="icon">
							<i class="iconfont">&#xe603;</i>
						</span>
						<span>新文章</span>
					</router-link>
				</div>

				<div class="navbar-item is-hoverable" v-if="navbarShowBtnPublish">
					<a class="button is-link link-draft"
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
			userName: '',
			userId: '',
			navbarShowBtnDraft: true,
			navbarShowBtnPublish: false,
			userAvatar: '',
			BtnPublishisLoading: false
		}
	},
	beforeMount () {
		// localStorage.setItem('userid', '')
		// localStorage.setItem('username', '')
		// localStorage.setItem('token', '')
		console.log(this)

		if (localStorage.getItem('token') !== null && localStorage.getItem('userid') !== null) {
			this.userId = localStorage.getItem('userid')
			this.userName = localStorage.getItem('username')
			this.userAvatar = this.GLOBAL.avatar + localStorage.getItem('userid') + '/0'
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

		this.$bus.on('handleNavbarLoginStatus', (action) => {
			if (action === 'signed') {
				this.userId = localStorage.getItem('userid')
				this.userName = localStorage.getItem('username')
				this.userAvatar = this.GLOBAL.api + '/avatar/' + localStorage.getItem('userid') + '/0'
			} else {
				localStorage.setItem('userid', '')
				localStorage.setItem('username', '')
				localStorage.setItem('token', '')
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
			localStorage.setItem('userid', '')
			localStorage.setItem('username', '')
			localStorage.setItem('token', '')
			this.userId = ''
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

		this.$bus.on('changeUserStatus', (data) => {//控制用户状态
			console.log(data)
			localStorage.setItem('userid', data.userid)
			localStorage.setItem('username', data.username)
			localStorage.setItem('token', data.token)

			if (localStorage.getItem('token') !== null) {
				this.GLOBAL.uid = data.userid
				this.GLOBAL.username = data.username
				this.GLOBAL.token = data.token

				this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
				this.$bus.emit('handleNavbarLoginStatus', 'signed')
			}

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
