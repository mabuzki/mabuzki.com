<template>
<main>
	<section class="section">
		<div class="container page-user">
			user
			<router-link to="/setting/profile" class="navbar-item">资料</router-link>
			<router-link to="/setting/account" class="navbar-item">设置</router-link>
		</div>
	</section>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</main>
</template>

<script>
export default {
	name: 'user',
	mounted() {
		this.$http.get( '/matrix/user-profile/' + this.$route.params.uid )
			.then(function (params) {
				if (params.data.success) {
					
				}
				console.log(params.data.result)
			})
	},
}
</script>
