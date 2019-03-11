<template>
<transition
	name="modal"
>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<a class="modal-close-button" @click="$emit('close')">x</a>
			<div class="modal-container box">
				<div class="modal-header">
					<slot name="header">
						<span class="title is-4">
							登陆
						</span>
					</slot>
				</div>
				<div class="modal-body">
					<slot name="body">

						<div class="login-section">
								
								<form method="POST" @submit.prevent="validateBeforeSubmit">
									<div class="field username">
										<div class="control has-icons-left has-icons-right">
											<input name="username" :class="{'input': true }" type="text" placeholder="昵称" autofocus>
											<span class="icon is-small is-left"><i class="fa fa-user"></i></span>
										</div>
									</div>

									<div class="field password">
										<div class="control has-icons-left has-icons-right">
											<input name="password" :class="{'input': true }" type="password" placeholder="密码">
											<span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
										</div>
									</div>
									
									<div class="field">
										<a class="btn btn-link">忘记密码?</a>
									</div>

									<div class="field">
										<input type="hidden" name="remember" checked>
										<button type="submit" class="ui blue button">登录</button>
									</div>

									<div class="ui error message">
										<div class="header"></div>
										<p></p>
									</div>
								</form>

							<div class="ui attached bottom message">
								<strong>当前页面需要登陆才能查看</strong>
								<p><span id="getregister">还没有账号? 点击这里进行注册.</span></p>
							</div>
						</div>


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
			remember: 1
		}
	},
	methods: {
		validateBeforeSubmit () {
			var vm = this;
			let data = {
				username:this.username,
				password:this.password,
				remember:1
			}
			console.log(data);

			this.$http.post('/login',data)
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