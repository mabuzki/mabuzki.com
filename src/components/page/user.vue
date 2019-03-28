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
				<div class="media-right" v-if="this.$store.state.userinfo.id == this.$route.params.uid">
					<router-link to="/setting">
						<i class="title is-4 icon iconfont">&#xe608;</i>
					</router-link>
				</div>
			</div>
		</div>
	</section>
	<section class="section" v-if="this.$store.state.userinfo.id == this.$route.params.uid">

	</section>
</main>
</template>

<script>
export default {
	name: 'user',
	data() {
		return {
			userid: '',
			username: '',
			bio: '',
			userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			userinfo: ''
		}
	},
	computed: {
		getUID() {
			return this.$route.params.uid
		}
	},
	watch: {
		getUID: function (_uid) {
			this.username = this.bio = ''
			this.userAvatar = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			this.$http.get( '/matrix/user-profile/' + _uid )
				.then( (params) => {
					if (params.data.success) {
						this.username = params.data.result.username
						this.bio = params.data.result.bio
						this.userAvatar = this.GLOBAL.avatar + params.data.result.id + '/2'
					}
				})
		}
	},
	beforeMount() {
		this.$http.get( '/matrix/user-profile/' + this.$route.params.uid )
			.then( (params) => {
				if (params.data.success) {
					this.username = params.data.result.username
					this.bio = params.data.result.bio
					this.userAvatar = this.GLOBAL.avatar + params.data.result.id + '/2'
				}
			})
	},
	mounted() {
	},
	methods: {
	}
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

