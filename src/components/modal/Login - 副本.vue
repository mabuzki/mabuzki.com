<template id="modal-template">
<transition name="modal">
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header">
						default header
					</slot>
				</div>
				<div class="modal-body">
					<slot name="body">

						<div class="container">
						<div class="login-section">
							<div class="box">
								<h2 class="title is-4">登陆</h2>
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

									<div class="ui error message"><div class="header"></div><p></p></div>
								</form>
							</div>

							<div class="ui attached bottom message">
								<strong>当前页面需要登陆才能查看</strong>
								<p><span id="getregister">还没有账号? 点击这里进行注册.</span></p>
							</div>
						</div>

						</div>

					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
						default footer
						<button class="modal-default-button" @click="$emit('close')">
							OK
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
export default {
}
</script>
