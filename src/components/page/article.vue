<template id="template">
<main class="article">
	<div class="container">
		<article>
			<header>
				<h1 class="title is-2">{{ article.subject }}</h1>
				<div class="media editor-header">
					<div class="media-left avatar">
						<router-link :to="{name:'u',params: {uid: article.authorid}}">
							<img v-bind:src="article.avatar" class="image is-48x48 avatar">
						</router-link>
					</div>
					<div class="media-content">
						<router-link :to="{name:'u',params: {uid: article.authorid}}">
							{{ article.author }}
						</router-link>
						<p>
							<small class="post_date" :title="article.date_post_title">{{ article.date_post }}</small>
						</p>
					</div>
				</div>
			</header>

			<div class="article-content" v-html="article.content"></div>
		</article>
		<!-- <footer class="lazyload"> -->
		<footer>
			<div class="box article-editor">
				<div class="media comment-header">
					<div class="media-left avatar">
						<router-link :to="{name:'u', params: {uid: this.$store.state.userinfo.id}}">
							<img v-bind:src="userAvatar" class="image is-32x32 avatar">
						</router-link>
					</div>
					<div class="media-content">
						<router-link :to="{name:'u', params: {uid: this.$store.state.userinfo.id}}">
							{{ this.$store.state.userinfo.name }}
						</router-link>
					</div>
				</div>
				<div id="editor" class="editor">comments</div>
				<div class="media">
					<a class="media-right button btn-reply" :class="{'is-loading': BtnCommentisLoading}" @click="doThat">回复</a>
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
	<remote-js :js-url="'../js/tinymce/tinymce.min.js'" :js-load-call-back="loadTinymceJS"></remote-js>
</main>
</template>

<script>
import RemoteJs from '@/components/RemoteJs'

export default {
	name: 'Articles',
	data () {
		return {
			article: {
				result: '',
				subject: '',
				date_post: '',
				date_post_title: '',
				content: '',
				authorid: '',
				author: '',
				avatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			},
			userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			replyHeader: '',
			selfHeader: '',
			comments: [],
			BtnCommentisLoading: false
		}
	},
	components: {//eslint-disable-line
		RemoteJs
	},
	beforeMount () {
		// this.userAvatar = this.GLOBAL.api + '/avatar/' + localStorage.getItem('userid') + '/0'
		this.userAvatar = this.$store.state.userinfo.avatar + '!avatar_small',

		this.$http.get('/article/' + this.$route.params.id)
			.then((response) => {
				this.articleLoading = false
				this.article = response.data.result
				this.article.avatar = this.GLOBAL.avatar + response.data.result.avatar + '!avatar_medium'
			})
			.catch(function (error) {
				console.log(error)
			})

		// document.querySelector('.btn-reply').onclick = function() {
		// 	console.log(tinymce.activeEditor.getContent({format : 'html'}))
		// }

		// document.addEventListener('lazybeforeunveil', function (e) {
		// 	console.log('test')
		// 	var target = e.target || e.srcElement
		// 	if (target.nodeName.toLowerCase() === 'footer') {
		// 		console.log('test')
		// 		// if ( UID ) {
		// 		// 	__self.replyHeader = '<div class="media-left avatar"><a href="'+ SITE +'u/'+ UID +'" title="" target="_blank"><img src="'+ SITE +'avatar/'+ UID +'/2" class="image is-32x32 avatar"></a></div><div class="media-content">'+ USERNAME +'</div><div class="media-right"><div class="dropdown is-hoverable is-up is-right"><div class="dropdown-trigger"><span class="icon"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span></div><div class="dropdown-menu" id="dropdown-menu4" role="menu"><div class="dropdown-content"><div class="dropdown-item"><p>积极回复来表示对作者的肯定哦~</p></div></div></div></div></div>';
		// 		// } else {
		// 		// 	__self.replyHeader = '<div class="media-content"><a href="'+ SITE +'login" title="">登录</a>之后才能发表你对这篇文章的看法</div>';
		// 		// }

		// 		__self.$http.get('/matrix/comment-' + __self.$route.params.id)
		// 			.then((response) => {
		// 				console.log(response.data)
		// 			})
		// 			.catch(function (error) {
		// 				console.log(error)
		// 			})

		// 		setTimeout(function () {
		// 			target.classList.remove('lazyloaded')
		// 		}, 300)
		// 	}
		// })
	},
	beforeDestroy () {
		// document.removeEventListener('lazybeforeunveil')
	},
	methods: {
		doThat: function () {
			this.$toasted.show('评论回复暂未开放')
			// if (!UID) return false
			if (!this.$store.state.userinfo.id) {
				this.$toasted.show('您尚未登陆')
				return false
			}

			var Count = tinymce.activeEditor.plugins.wordcount.getCount();
			if (Count < 1) {
				this.$toasted.show('还没有输入意见')
				return false;
			}

			var comment = tinyMCE.activeEditor.getContent();
			console.log(comment);
			this.BtnCommentisLoading = true
			this.$http.post('/comment',
				{
					id: this.$route.params.id,
					authorid: this.$store.state.userinfo.id,
					comment: comment
				})
				.then((response) => {
					if (!response.data.success) {
						this.BtnCommentisLoading = false
						return false
					}
					// eslint-disable-next-line
					setTimeout(() => {
						
					}, 2000)
				})
				.catch(function (error) {
					this.BtnCommentisLoading = false
					console.log(error)
				})
			

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
		},

		loadTinymceJS () {//eslint-disable-line
			// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			var config = {
				selector: '#editor',
				menubar: false,
				toolbar: 'bold italic strikethrough link | bullist blockquote',
				inline: false,
				resize: false,
				statusbar: false,
				plugins: [
					'link',
					'lists',
					'wordcount',
					'paste'
				],
				language: 'zh_CN',
				resize: false,
				object_resizing : false,
				// quickbars_insert_toolbar: 'customInsertButton',
				quickbars_insert_toolbar: '',
				image_caption: true,
				contextmenu: '',//屏蔽右键上下文
				quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
				paste_data_images: false,
				paste_filter_drop: false,
				paste_word_valid_elements: "b,strong,i,em,h1,h2",
				paste_webkit_styles: "",
				paste_retain_style_properties: "",
				paste_as_text: true,
				init_instance_callback: (editor) => {
					editor.on('NodeChange', (e) => {
					})

					editor.on('Focus', (e) => {
					})

					editor.on('Blur', (e) => {
						if (editor.getContent()) {
							editor.contentAreaContainer.classList.add('noplaceholder')
						} else {
							editor.contentAreaContainer.classList.remove('noplaceholder')
						}
					})
				},
				setup: (editor) => {
					console.log('setup:'+editor)
				}
			}

			tinymce.init(config)
		},
	}
}
</script>

<style scoped>

</style>

<style>
.tox-tinymce {
	margin: 10px 0
}
</style>


