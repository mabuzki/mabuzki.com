<template>
<div class="section-login">
	<h2 class="title is-3">
		<span>
			欢迎回来
		</span>
	</h2>
	<div class="btnHideModal">
		<a @click="$modal.hide('modalLogin')">
			随便看看
		</a>
    </div>
	<form >
		<div class="field email">
			<div class="control has-icons-right">
				<input name="email" v-model="email" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="邮箱" tabindex="1" autofocus>
				<span v-show="errors.has('email')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
			</div>
		</div>

		<div class="field password">
			<div class="control has-icons-right">
				<input name="password" v-model="password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" tabindex="2" placeholder="密码">
				<span v-show="errors.has('password')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			</div>
		</div>

		<div class="field has-text-centered">
			<input type="hidden" name="remember" checked>
			<button class="button is-dark is-medium is-fullwidth" tabindex="3" :class="{'is-loading': isLoading}" @click.stop.prevent="validateBeforeSubmit">登录</button>
		</div>

		<div class="field has-text-centered">
			<a class="button is-medium is-fullwidth" :class="{'is-disabled': isDisabled}" @click="swtichModalRegister">注册</a>
		</div>

		<div class="field has-text-centered">
			<a class="btn btn-link">
				<small>找回密码</small>
			</a>
		</div>

		<div class="ui error message"><div class="header"></div><p></p></div>
	</form>

	<!-- <div class="ui attached bottom message">
		<strong>当前页面需要登陆才能查看</strong>
		<p><span id="getregister">还没有账号? 点击这里进行注册.</span></p>
	</div> -->
</div>
</template>

<script>
export default {
	name: 'Login',
	data () {
		return {
			email: '',
			password: '',
			isLoading: false,
			isDisabled: false
		}
	},
	methods: {
		hideModalLogin () {
			this.$modal.hide('modalLogin')
		},
		swtichModalRegister () {
			this.$bus.emit('swtichModalRegister')
		},
		validateBeforeSubmit () {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.isLoading = true
					this.$http.post('/auth/login', {
						email: this.email,
						password: this.password,
						remember: 1
					}).then((response) => {
						if (!response.data.success) {
							this.isLoading = false
							return
						}
						this.$store.commit('setUser', response.data)//vuex存储用户状态 userid username token
						this.$bus.emit('handleModalLoginClose')
					}).catch((error) => {
						this.isLoading = false
						console.log(error)
					})
				}
			})
		}
	}
}
</script>
