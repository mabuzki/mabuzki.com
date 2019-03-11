<template>
<transition
	name="modal"
	>
	<div class="modal-mask">
		<div class="modal-wrapper modal-sign-up">
			<a class="modal-close-button" @click="$emit('close')">x</a>
			<div class="modal-container box">
				<div class="modal-header">
					<slot name="header">
						<span class="title is-4">
							注册
						</span>
					</slot>
				</div>
				<div class="modal-body">
					<slot name="body">

				<form method="POST" @submit.prevent="validateBeforeSubmit">
					<div class="field username">
						<div class="control has-icons-left has-icons-right">
							<input
								type="text"
								placeholder="昵称"
								v-model="username" 
								:class="{'input': true }"
								>
							<span class="icon is-small is-left"><i class="fa fa-user"></i></span>
						</div>
					</div>					

					<div class="field password">
						<div class="control has-icons-left has-icons-right">
							<input
								type="password"
								placeholder="密码"
								v-model="password"
								:class="{'input': true }"
								>
							<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
						</div>
					</div>

					<div class="field phone_number">
						<div class="control has-icons-left has-icons-right">
							<input
								type="text"
								placeholder="手机号码"
								v-model="telphone"
								:class="{'input': true }"
								>
							<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
							<div >
								<a class="sendsms">获取验证码</a>
							</div>
						</div>
					</div>

					<div class="field phone_number_check">
						<div class="control has-icons-left has-icons-right">
							<input
								type="text"
								placeholder="验证码"
								v-model="secchk"
								:class="{'input': true }"
								maxlength="6"
								>
							<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
						</div>
						
					</div>

					<div class="field">
						<button type="submit" class="ui green fluid button">注册</button>
					</div>

					<div class="ui horizontal divider">或者</div>
					<i class="weibo icon"></i>
					<i class="wechat icon"></i>
				</form>

					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>

		</div>
	</div>
</transition>
</template>

<script>
export default {
	data() {
		return {
			username: 'ning',
			password: 'saverland',
			telphone: '15666510209',
			secchk: '123456'
		}
	},
	methods: {
		validateBeforeSubmit () {
			var vm = this;
			let data = {
				username:this.username,
				password:this.password,
				telphone: this.telphone,
				secchk: this.secchk
			}
			console.log(data);

			this.$http.post('/sign-up',data)
			.then((response) => {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>