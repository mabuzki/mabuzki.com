<template>
<main class="page-setting">
	<div class="container">
		<section>
			<div class="columns is-mobile">
				<div class="column is-narrow">
					<div class="field has-addons" style="width: 50%;">
						<p class="control">
							<router-link to="/setting/profile" class="button">资料</router-link>
						</p>
						<p class="control">
							<router-link to="/setting/account" class="button">设置</router-link>
						</p>
						<p class="control">
							<router-link to="/setting/verify" class="button">验证账号</router-link>
						</p>
					</div>
				</div>
				<div class="column">
					<div class="buttons has-addons is-right">
						<a class="button"
							@click="handleModalLogoutOpen()">登出</a>
					</div>
				</div>
			</div>
		</section>
		<router-view v-if="isRouterAlive"/>
	</div>
</main>
</template>

<script>
export default {
	provide() {
		return {
			reload: this.reload
		}
	},
	data () {
		return {
			isRouterAlive: true
		}
	},
	computed: {
		userStatus() {
			let userinfo = {
				id: this.$store.state.userinfo.id
			}
			return userinfo
		}
	},
	watch: {
		userStatus: function (_new) {
			if (_new.id) {
				this.reload()
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		document.title = '个人设置'
		next()
	},
	beforeCreate () {
		if ( !this.$store.state.userinfo.id ) {
			this.$bus.emit('handleModalLoginOpen')
			this.$toasted.show('请重新登录')
			return false
		}
	},
	methods: {
		handleModalLogoutOpen () {
			this.$bus.emit('handleModalLogoutOpen')
		},
		reload() {
			this.isRouterAlive = false
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
		}
	},
	beforeDestroy () {
		this.$bus.emit('handleModalLoginClose', 0)
	}
}
</script>

