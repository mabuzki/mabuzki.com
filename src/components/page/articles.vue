<template>
<main class="page-articles">
	<section class="info">
		<div class="container">
			<div class="content">
				<div class="card card-article" v-for="article in articles" :key="article.id">
					<header class="card-header">
						<p class="card-header-title">
							<span>
								<img :src="GLOBAL.api + '/avatar/' + article.authorid + '/1'" class="author avatar" alt="">
							</span>
							{{ article.subject }}
						</p>
					</header>
					<div class="card-content">
						<div class="content" v-html="article.content" @click="jumpToArticle(article.id)">
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
			articles: []
		}
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
.card-header {
	box-shadow: none;
}
</style>


