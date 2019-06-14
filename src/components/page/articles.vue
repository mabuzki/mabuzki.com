<template>
<main class="page-articles">
	<div class="container">
		<article-card :articles="articles" :dontShowHeader="dontShowHeader" ></article-card>
	</div>
</main>
</template>

<script>
import articleCard from '@/components/page/articleCard'

export default {
	data() {
		return {
			articles: [],
			dontShowHeader: false 
		}
	},
	beforeRouteEnter (to, from, next) {
		document.title = '最新文章 -- Mabuzki.com'
		next()
	},
	beforeMount() {
		this.$http.get('/articles-new/'+ this.$route.params.page)
			.then((response) => {
				this.articles = response.data.articles
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	mounted() {
	},
	beforeDestroy() {
	},
	components: {
		'article-card': articleCard
	}
}
</script>



