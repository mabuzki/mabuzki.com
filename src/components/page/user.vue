<template>
<main class="page-user">
	<div class="container">
		<section class="info">
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
		</section>
		<section v-if="userinfo.nopost">
			<div class="content empty">
				还没发表过内容
			</div>
		</section>
		<article-card :articles="userinfo.articles" :dontShowHeader="dontShowHeader" v-else></article-card>	
	</div>
</main>
</template>

<script>
import articleCard from "@/components/page/articleCard"

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
			},
			dontShowHeader: true
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
							document.title = params.data.userinfo.username + ' 的主页 -- Mabuzki.com'
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
	},
	components: {
		'article-card': articleCard
	}
}
</script>

<style scope>
.page-user .avatar {
	background: #F2F2F2;
	width: 90px;
	height: 90px;
	border-radius: 50%
}
.empty {
	color: #808080
}
</style>

