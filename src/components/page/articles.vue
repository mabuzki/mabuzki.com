<template>
<main class="page-articles">
	<section class="info">
		<div class="container">
			<div class="content">
				<div class="card card-article" v-for="article in articles" :key="article.id">
					<header class="card-header">
						<p class="card-header-title">
							<router-link :to="{ name: 'u', params:{ uid: article.authorid }}">
								<span>
									<img :src="GLOBAL.avatar + article.avatar + '!avatar_small'" class="author avatar" :alt="article.author">
								</span>
							</router-link>
							<router-link :to="{ name: 'u', params:{ uid: article.authorid }}">
								{{ article.author }}
							</router-link>
						</p>
					</header>
					<div class="card-content">
						<h6 class="">
							<router-link :to="{ name: 'article', params:{ id: article.id }}">{{ article.subject }}</router-link>
						</h6>
						<div class="content" v-html="article.content" @click.stop="jumpToArticle(article.id)"></div>
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
			articles: []
		}
	},
	beforeRouteEnter (to, from, next) {
		document.title = '最新文章'
		next()
	},
	beforeMount() {
		this.$http.get('/articles-new')
			.then((response) => {
				this.articles = response.data.articles
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	methods: {
		jumpToUser(id) {
			this.$router.push({
				path: '/u/'+id
			});
		},
		jumpToArticle(id) {
			this.$router.push({
				path: '/article/'+id
			});
		}
	},
	beforeDestroy() {
	}
}
</script>

<style scoped>
.card {
	margin-bottom: 2rem
}
</style>

<style>
.content figure {
	margin-left: 0;
	margin-right: 0
}

.content figure figcaption {
	color: #808080;
	font-style: normal!important
}
</style>



