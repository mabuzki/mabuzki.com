<template id="template">
<section class="content">
	<article class="card card-article" v-for="article in articles" :key="article.id">
		<header class="card-header" v-if="!dontShowHeader">
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
			<time v-if="article.replynum > 0">
				<router-link :to="{ name: 'article', params:{ id: article.id }}">
					已有<em v-text="article.replynum"></em>条评论
				</router-link>
			</time>
		</div>
	</article>
</section>
</template>

<script>
export default {
	data () {
		return {
			content: {
			}
		}
	},
	props: [
		'articles',
		'dontShowHeader'//在用户个人主页不显示avatar和名字
	],
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
}
</script>

<style scoped>

/* 文章列表 */
.card {
	color: #222;
}
.card-article {
	
	border-radius: 3px;
	margin-bottom: 4rem;
}

.card-article .card-header {
	box-shadow: none
}

.card-article .card-header-title {
	padding: .75rem 1.5rem 0;
}

.card-article .card-header-title span {
	margin-right: 10px;
	font-size: small
}

.card-article .card-header-title .author.avatar {
	width: 28px;
	height: 28px;
}

.card-article time {
	font-size: smaller;
	color: #808080
}

.article-content:first-child  { min-height: 650px; }
.article-content p { font-size: 1.15em; margin: 3rem 0 0; line-height: 1.8; }
.article-content p:first { margin-top: 0; }

em {
	font-style: normal
}

@media (max-width: 641px) {
	.card {
		box-shadow: none!important
	}

	.card-article .card-header-title {
		padding-left: 0!important;
		padding-right: 0!important
	}

	.card-content {
		padding: 1.5rem 0;
	}
}
</style>

<style>
.card-article figure {
	text-align: center;
	margin-left: -1.5rem!important;
    margin-right: -1.5rem!important;
}
.card-article figure:first { margin-top: 0; }
.card-article figure img { -o-object-fit: cover; object-fit: cover; max-height: 640px; }
.card-article .media-image-box {
	position: relative;
	box-shadow: 0 -1px 0 rgba(244,233,247,.8);
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(#f4f3f7, #f4f3f7);
}
.card-article .media-image-box .tag {
	position: absolute;
	top: 5px;
	right: 5px;
	font-size: 1.2em;
	height: 1.6em;
	padding-left: .5em;
	padding-right: .5em;
}
.card-article blockquote { margin-left: -23px; }
.card-article figcaption { margin: .8rem 0; line-height: 1em;  font-size: .85em; color: #B5B5B5; }
</style>



