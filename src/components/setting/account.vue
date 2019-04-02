<template id="template">
<section class="section">
	<div class="container setting-account-section">
		<form method="POST" @submit.prevent="validateBeforeSubmit">
			<div class="notification">
				设置页面暂未开放
			</div>
			<section>
				<h2 class="title is-3">设置</h2>
				<div class="field mobile">
					<h4 class="title is-5">手机</h4>
					<div class="media">
						<div class="media-content">
							<div class="control has-icons-right">
								<input name="mobile" v-model="mobile" :class="{'input': true}" type="text" placeholder="手机号码">
								<span class="icon is-small is-right"><i class="fa fa-warning"></i></span>
								<span class="help is-danger"></span>
							</div>
						</div>
						<div class="media-right">
							<div class="button" disabled>修改</div>
						</div>
					</div>
				</div>

				<div class="field mail">
					<h4 class="title is-5">邮箱</h4>
					<div class="media">
						<div class="media-content">
							<div class="control has-icons-right">
								<input name="email" v-model="email" :class="{'input': true }" type="text" placeholder="邮箱">
								<span class="icon is-small is-right"><i class="fa fa-warning"></i></span>
								<span class="help is-danger"></span>
							</div>
						</div>
						<div class="media-right">
							<div class="button" disabled>修改</div>
						</div>
					</div>
				</div>

				<div class="field">
					<h4 class="title is-5">通知</h4>
					<div class="media">
						<div class="media-content">是否接收来自站点的其他会员给你发送的通知</div>
						<div class="media-right">
							<div class="notify buttons has-addons">
								<span class="button"
									v-for='(notify, index) in notifys' :key='index'
									:class="notify.class"
									@click="notifySelect(index)" disabled>{{ notify.text }}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="field mail">
					<h4 class="title is-5">黑名单</h4>
					<div class="media">
						<div class="media-content">
							管理你已屏蔽的用户名单
						</div>
						<div class="media-right">
							<div class="button" disabled>查看/修改</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 class="title is-3 mt3r">快捷登录</h2>
				<div class="field weibo">
					<h4 class="title is-5">微博</h4>
					<div class="media">
						<div class="media-content">
							仅用于新浪微博用户快捷登录使用
						</div>
						<div class="media-right">
							<div class="button is-danger" disabled>
								<span class="icon"><span class="icon iconfont">&#xe720;</span></span>
								<span>绑定</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</form>
	</div>
</section>
</template>

<script>
export default {
	name: 'SettingAccount',
	data () {
		return {
			mobile: '',
			email: '',
			notifys: [
				{ text: '全部', class: 'is-success is-selected' },
				{ text: '仅好友' },
				{ text: '免打扰' }
			]
		}
	},
	watch: {
		content: function (newContent) {
		}
	},
	beforeMount () {
		if ( !this.$store.state.userinfo.id ) return false
		this.getAccount()
		// this.$validator.extend('mobile', {
		// 	messages: {
		// 		en:field => field + '必须是11位手机号码',
		// 	},
		// 	validate: value => {
		// 		return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
		// 	}
		// });
	},
	methods: {
		getAccount () {
			this.$http.post( '/setting-account' )
				.then((response) => {
					this.mobile = response.data.result.mobile;
					this.email = response.data.result.email;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		notifySelect: function (index) {
			let btnNotify = document.querySelectorAll('.notify span')
			for (let i = 0; i < btnNotify.length; i++) {
				btnNotify[i].classList.remove('is-success')
				btnNotify[i].classList.remove('is-selected')
			}

			btnNotify[index].classList.add('is-success')
			btnNotify[index].classList.add('is-selected')
		}
	}
}
</script>
