<template>
<main class="page-user">
	<section class="info">
		<div class="container">
			<div class="media">
				<div class="avatar media-left">
					<img :src="userinfo.userAvatar" class="image is-128x128 avatar">
				</div>
				<div class="media-content">
					<h3 class="title is-3">{{ userinfo.username }}</h3>
					<div class="signature">{{ userinfo.signature }}</div>
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
			<div class="content" v-if="userinfo.nopost">
				还没发表过内容
			</div>
			<div class="content" v-else>
				<div class="card card-article" v-for="article in userinfo.articles" :key="article.id" @click="jumpToArticle(article.id)">
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
			userinfo: {
				userid: '',
				username: '',
				signature: '',
				// userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
				userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
				userinfo: '',
				nopost: true,
				articles: []
			}
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
			this.userinfo.username = this.signature = ''
			this.userinfo.userAvatar = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			this.getUserInfo(uid)
			this.nopost = false
		}
	},
	beforeRouteEnter (to, from, next) {
		next( vm => {
			vm.getUserInfo(vm.$route.params.uid)
		})
	},
	beforeRouteLeave (to, from, next) {
		// ...
		next()
	},
	methods: {
		getUserInfo (uid) {
			this.$http.get( '/user-profile/' + uid )
				.then( (params) => {
					if (params.data.success) {
						if (params.data.userinfo.status === 0) {
							this.userinfo.username = params.data.userinfo.username
							this.userinfo.signature = params.data.userinfo.signature
							this.userinfo.userAvatar = this.GLOBAL.avatar + params.data.userinfo.avatar + '!avatar_medium'
							if (!params.data.articles[0]) {
								this.userinfo.nopost = true
							} else {
								this.userinfo.nopost = false
								this.userinfo.articles = params.data.articles
							}
						} else if (params.data.userinfo.status === -1) {

						}
					}
				})
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
.card.card-article {
	margin-bottom: 2rem;
}
</style>

