<template>
<main>
	<section class="section">
		<div class="container page-user">
			user
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
