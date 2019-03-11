<template>
<div class="section-logout">
	<h2 class="title is-3">
		确认退出?
	</h2>
	<div class="field">
		<a class="button is-dark is-medium is-fullwidth" @click='hideUserLogout' :class="{'is-loading': isLoading}">确认</a>
	</div>
	<div class="field">
		<a class="button is-medium is-fullwidth" @click='hideModalLogout'>取消</a>
	</div>
</div>
</template>

<script>
export default {
	name: 'logout',
	data () {
		return {
			isLoading: false
		}
	},
	methods: {
		hideModalLogout () {
			this.$modal.hide('modalLogout')
		},
		handleLogout (msg) {
			this.$bus.emit('handleNavbarLoginStatus', 'logout')
			if (msg) this.$toasted.show(msg)
			this.isLoading = false
			this.$modal.hide('modalLogout')
			if (this.$route.path !== '/') {
				this.$router.push({path: '/'})
			}
		},
		hideUserLogout () {
			let __self = this
			__self.isLoading = true
			this.$http.post('/auth/logout')
				.then((response) => {
					if (response.data.success) {
						__self.handleLogout(response.data.info)
						return
					}
					__self.handleLogout()
				})
				.catch(function (error) {
					__self.handleLogout(error.message)
				})
		}
	}
}
</script>
