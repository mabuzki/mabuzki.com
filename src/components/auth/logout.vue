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
		handleLogout () {
			this.$store.commit('clearUser')
			this.$toasted.show('再见，等你回来')
			setTimeout(() => {
				this.isLoading = false
				this.$modal.hide('modalLogout')
				if (this.$route.path !== '/') {
					this.$router.push({path: '/'})
				}
			}, 1500)
		},
		hideUserLogout () {
			this.isLoading = true
			this.$http.post('/auth/logout')
				.then((response) => {
					if (response.data.success) {
						return this.handleLogout(response.data.info)
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			this.handleLogout()
		}
	}
}
</script>
