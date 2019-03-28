<template>
<div class="section-register">
	<h2 class="title is-3">
		注册
	</h2>
	<div class="btnHideModal">
		<a @click="$modal.hide('modalRegister')">
			随便看看
		</a>
    </div>
	<form>
		<div class="field email">
			<div class="control has-icons-right">
				<input name="email" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="邮箱" autofocus>
				<span v-show="errors.has('email')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
			</div>
		</div>

		<div class="field username">
			<div class="control has-icons-right">
				<input name="username" v-model="username" v-validate="'required|min:3|max:12'" :class="{'input': true, 'is-danger': errors.has('username') }" type="text" placeholder="昵称" autofocus>
				<span v-show="errors.has('username')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
			</div>
		</div>

		<div class="field password">
			<div class="control has-icons-right">
				<input name="password" v-model="password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="密码">
				<span v-show="errors.has('password')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			</div>
		</div>

		<!-- <div class="field telphone">
			<div class="media">
				<div class="media-content">
					<div class="control has-icons-right">
						<input name="telphone" v-model="telphone" v-validate="'required|mobile'" :class="{'input': true, 'is-danger': errors.has('telphone') }" type="text" placeholder="手机号">
						<span v-show="errors.has('telphone')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
						<span v-show="errors.has('telphone')" class="help is-danger">{{ errors.first('telphone') }}</span>
						<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
					</div>
				</div>

				<div class="media-right">
					<div class="button">获取验证码</div>
				</div>
			</div>
		</div>

		<div class="field secchk">
			<div class="control has-icons-right">
				<input name="secchk" v-model="secchk" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('secchk') }" type="text" placeholder="验证码">
				<span v-show="errors.has('secchk')" class="icon is-small is-right"><i class="fa fa-warning"></i></span>
				<span v-show="errors.has('secchk')" class="help is-danger">{{ errors.first('secchk') }}</span>
				<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
			</div>

		</div> -->

		<div class="field has-text-centered">
			<a class="button is-dark is-medium is-fullwidth" :class="{'is-loading': isLoading}" @click="validateBeforeSubmit">注册</a>
		</div>

		<!-- <div class="ui horizontal divider">或者</div>
		<i class="weibo icon"></i>
		<i class="wechat icon"></i> -->
	</form>

</div>
</template>

<script>
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import langCN from 'vee-validate/dist/locale/zh_CN'
// import PhoneNumber from 'awesome-phonenumber'
// import ENUS from 'vee-validate/dist/locale/en'
// import VueI18n from 'vue-i18n'

Validator.addLocale(langCN)
Vue.use(VeeValidate, {
	locale: 'zh_CN'
})

const Dictionary = {
	zh_CN: {
		messages: {
			required: field => '请输入' + field
		},
		attributes: {
			email: '邮箱',
			username: '账号',
			password: '密码',
			telphone: '手机号',
			secchk: '验证码'
		}
	}
}

Validator.updateDictionary(Dictionary)

// const phoneNumber = {
// 	getMessage: field => `${field} 不是合格的手机号`,
// 	validate (value) {
// 		value = '+86' + value
// 		return new Promise(resolve => {
// 			let phone = new PhoneNumber(value)
// 			resolve({ valid: phone.isMobile() })
// 		})
// 	}
// }

// const secchk = {
// 	getMessage: field => `请输入 ${field}`,
// 	validate (value) {
// 		return new Promise(resolve => {
// 			resolve({ valid: true })
// 		})
// 	}
// }

// 自定义validate error 信息
// Validator.extend('mobile', phoneNumber)
// Validator.extend('secchk', secchk)

export default {
	name: 'Register',
	data () {
		return {
			email: '',
			username: '',
			password: '',
			telphone: '',
			secchk: '',
			isLoading: false
		}
	},
	methods: {
		validateBeforeSubmit () {
			this.$validator.validateAll().then((result) => {
				if (result) {
					console.log(this.errors)
					this.isLoading = true
					this.$http.post('/sign-up', {
						email: this.email,
						username: this.username,
						password: this.password,
						telphone: this.telphone,
						secchk: this.secchk
					}).then((response) => {
						console.log(response.data)
						this.isLoading = false
						if (!response.data.success) {
							for (var o in response.data.extra) {
								let target = document.querySelector('input[name=' + o + ']')
								target.classList.add('is-danger')
								target.nextElementSibling.style.display = ''
								target.nextElementSibling.nextElementSibling.innerText = response.data.extra[o]
								target.nextElementSibling.nextElementSibling.style.display = ''
							}
							return false
						} else {
							response.data.origin = 'register'
							this.$store.commit('setUser', response.data)
							this.$bus.emit('changeUserStatus', response.data)//控制用户状态 pos:header.vue
						}
					}).catch(function (error) {
						this.isLoading = false
						console.log(error)
					})
				}
			})
		}
	}
}
</script>
