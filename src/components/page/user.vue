<template>
<main class="page-user">
	<section class="info">
		<div class="container">
			<div class="media">
				<div class="avatar media-left">
					<img v-bind:src="userAvatar" class="image is-128x128 avatar">
				</div>
				<div class="media-content">
					<h3 class="title is-3">{{ username }}</h3>
					<div class="bio">{{ bio }}</div>
				</div>
				<div class="media-right" v-if="userid == this.$route.params.uid">
					<router-link to="/setting">
						<i class="title is-4 icon iconfont">&#xe608;</i>
					</router-link>
				</div>
			</div>
		</div>
	</section>
	<section class="section" v-if="userid == this.$route.params.uid">

	</section>
</main>
</template>

<script>
export default {
	name: 'user',
	data() {
		return {
			userid: this.$store.state.userinfo.id,
			username: '',
			bio: '',
			// userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			userAvatar: this.GLOBAL.avatar + this.$route.params.uid + '/2',
			userinfo: ''
		}
	},
	beforeMount() {
		this.$http.get( '/matrix/user-profile/' + this.$route.params.uid )
			.then( (params) => {
				if (params.data.success) {
					this.username = params.data.result.username
					this.bio = params.data.result.bio
				}
				console.log(params.data.result)
			})
	},
	mounted() {
	},
}
</script>

<style>
.page-user .avatar {
	background: #F2F2F2;
	width: 90px;
	height: 90px;
	border-radius: 50%
}
</style>

