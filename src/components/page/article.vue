<template id="template">
<main class="article">
	<div class="container" v-if="articleLoading">
	</div>
	<div class="container" v-else>
		<article>
			<header>
				<h1 class="title is-2">{{ articleSubject }}</h1>
				<div class="media editor-header">
					<div class="media-left avatar">
						<router-link :to="{name:'u',params: {uid: articleUserId}}">
							<img v-bind:src="articleUserAvatar" class="image is-48x48 avatar">
						</router-link>
					</div>
					<div class="media-content">
						<router-link :to="{name:'u',params: {uid: articleUserId}}">
							{{ articleUserName }}
						</router-link>
						<p>
							<small class="post_date" :title="articlePostDateTitle">{{ articlePostDate }}</small>
						</p>
					</div>
				</div>
			</header>

			<div class="article-content" v-html="articleContent">

			</div>
		</article>
		<footer class="lazyload">
			<div class="box article-editor">
				<div class="media comment-header">
					<div class="media-left avatar">
						<router-link :to="{name:'u', params: {uid: userId}}">
							<img v-bind:src="userAvatar" class="image is-32x32 avatar">
						</router-link>
					</div>
					<div class="media-content">
						<router-link :to="{name:'u', params: {uid: userId}}">
							{{ userName }}
						</router-link>
					</div>
				</div>
				<div id="editor" class="editor">comments</div>
				<div class="media">
					<a class="media-right button btn-reply" @click="doThat">回复</a>
				</div>
			</div>

			<div class="comments" title="暂无评论">
				<div class="box" v-for="comment in comments" :key="comment.id">
					<div class="media editor-header" v-html="selfHeader">

					</div>
					<div v-html="comment.message"></div>
				</div>
			</div>
		</footer>
	</div>
</main>
</template>

<script>
export default {
	name: 'Articles',
	data () {
		return {
			articleLoading: true,
			articleUserId: '',
			articleUserName: '',
			articleUserAvatar: '',
			articleSubject: '',
			articlePostDate: '',
			articlePostDateTitle: '',
			articleContent: '',
			userId: '',
			userName: '',
			userAvatar: '',
			replyHeader: '',
			selfHeader: '',
			comments: []
		}
	},
	mounted () {
		const __self = this

		if (localStorage.getItem('token') !== null && localStorage.getItem('userid') !== null) {
			this.userId = localStorage.getItem('userid')
			this.userName = localStorage.getItem('username')
			this.userAvatar = this.GLOBAL.api + '/avatar/' + localStorage.getItem('userid') + '/0'
		}

		this.$http.get('/matrix/article-' + this.$route.params.id)
			.then((response) => {
				console.log(response)
				console.log(response.data.result.content)
				this.articleLoading = false
				this.result = response.data.result
				this.articleSubject = response.data.result.subject
				this.articlePostDate = response.data.result.date_post
				this.articlePostDateTitle = response.data.result.date_post_title
				this.articleContent = response.data.result.content
				this.articleUserId = response.data.result.authorid
				this.articleUserName = response.data.result.author
				this.articleUserAvatar = this.GLOBAL.api + '/avatar/' + response.data.result.authorid + '/2'
			})
			.catch(function (error) {
				console.log(error)
			})

		// document.querySelector('.btn-reply').onclick = function() {
		// 	console.log(tinymce.activeEditor.getContent({format : 'html'}))
		// }

		document.addEventListener('lazybeforeunveil', function (e) {
			console.log('test')
			var target = e.target || e.srcElement
			if (target.nodeName.toLowerCase() === 'footer') {
				console.log('test')
				// if ( UID ) {
				// 	__self.replyHeader = '<div class="media-left avatar"><a href="'+ SITE +'u/'+ UID +'" title="" target="_blank"><img src="'+ SITE +'avatar/'+ UID +'/2" class="image is-32x32 avatar"></a></div><div class="media-content">'+ USERNAME +'</div><div class="media-right"><div class="dropdown is-hoverable is-up is-right"><div class="dropdown-trigger"><span class="icon"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span></div><div class="dropdown-menu" id="dropdown-menu4" role="menu"><div class="dropdown-content"><div class="dropdown-item"><p>积极回复来表示对作者的肯定哦~</p></div></div></div></div></div>';
				// } else {
				// 	__self.replyHeader = '<div class="media-content"><a href="'+ SITE +'login" title="">登录</a>之后才能发表你对这篇文章的看法</div>';
				// }

				__self.$http.get('/matrix/comment-' + __self.$route.params.id)
					.then((response) => {
						console.log(response.data)
					})
					.catch(function (error) {
						console.log(error)
					})

				setTimeout(function () {
					target.classList.remove('lazyloaded')
				}, 300)
			}
		})
	},
	methods: {
		doThat: function () {
			// if (!UID) return false
			// let Count = tinymce.activeEditor.plugins.wordcount.getCount();
			// let Content = tinyMCE.activeEditor.getContent();
			// console.log(Content);
			// if (Count === 0) {
			// 	notie.alert({ type: 'error', text: '对作者无话可说?' });
			// 	return false;
			// }

			// this.comments.unshift({
			// 	message: Content
			// })

			// console.log(tinyMCE.activeEditor.bodyElement);
			// tinyMCE.activeEditor.bodyElement.classList.add('animated');
			// tinyMCE.activeEditor.bodyElement.classList.add('fadeOutDown');
			// tinyMCE.activeEditor.setContent('');

			document.querySelector('.comments').setAttribute('title', '')
		},

		updateContent: function () {
			console.log(this.$el.textContent) // => '没有更新'
			this.$nextTick(function () {
				console.log(this.$el.textContent) // => '更新完成'
			})
		}
	}
}
</script>
