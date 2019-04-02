<template>
<main class="page-user">
	<section class="info">
		<div class="container">
			<div class="media">
				<div class="avatar media-left">
					<img :src="userAvatar" class="image is-128x128 avatar">
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
	<section class="section">
		<div class="container">
			<div class="content" v-if="nopost">
				还没发表过内容
			</div>
			<div class="content" v-else>
				<div class="card card-article" v-for="article in articles" :key="article.id" @click="jumpToArticle(article.id)">
					<header class="card-header">
						<p class="card-header-title">
							{{ article.subject }}
						</p>
					</header>
					<div class="card-content">
						<div class="content" v-html="article.content">
						</div>
						<time :datetime="article.date_post" :title="article.date_post_title" v-text="article.date_post"></time>
					</div>
				</div>
			</div>
		</div>
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
			userinfo: '',
			nopost: false,
			articles: []
		}
	},
	computed: {
		getUID() {
			return this.$route.params.uid
		}
	},
	watch: {
		getUID: function (uid) {
			if (!uid) return false
			this.username = this.bio = ''
			this.userAvatar = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			this.getUserInfo(uid)
			this.nopost = false
		}
	},
	beforeMount() {
		this.getUserInfo(this.$route.params.uid)
	},
	methods: {
		getUserInfo (uid) {
			this.$http.get( '/user-profile/' + uid )
				.then( (params) => {
					if (params.data.success) {
						if (params.data.userinfo.status === 0) {
							this.username = params.data.userinfo.username
							this.bio = params.data.userinfo.bio
							this.userAvatar = this.GLOBAL.avatar + params.data.userinfo.id + '/2'
							if (!params.data.articles[0]) {
								this.nopost = true
							} else {
								this.nopost = false
								this.articles = params.data.articles
							}
						} else if (params.data.userinfo.status === -1) {

						}
					}
				})
			
			// this.$http.get( '/matrix/user-article/' + uid + '/1')
			// 	.then( (_params) => {
			// 		if ( !_params.data.result ) {
			// 			this.nopost = true
			// 		} else {
			// 			this.noposet = false
						
			// 		}
			// 	})
		},
		jumpToArticle(id) {
			this.$router.push({path: '/article/'+id});
		}
	},
	beforeDestroy() {
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
time {
	font-size: smaller
}
</style>

