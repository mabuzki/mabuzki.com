<template id="template">
<main class="page-article">
	<section class="container">
		<article :class="{'is-loading': articleLoading}" v-if="articleLoading">
			<header>
				<h1 class="title is-2 hasLoadingBg"></h1>
				<div class="media editor-header">
					<div class="media-left avatar">
						<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="image is-48x48 avatar hasLoadingBg">
					</div>
					<div class="media-content">
						<span class="username hasLoadingBg"></span>
					</div>
				</div>
			</header>

			<div class="article-content">
				<div class="content-1 hasLoadingBg"></div>
				<div class="content-2 hasLoadingBg"></div>
				<div class="content-3 hasLoadingBg"></div>
				<div></div>
				<div class="content-4 hasLoadingBg"></div>
			</div>
		</article>

		<article v-else>
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
		<div class="box article-editor" v-if="this.$store.state.userinfo.id">
			<div class="media comment-header">
				<div class="media-left avatar">
					<router-link :to="{name:'u', params: {uid: this.$store.state.userinfo.id}}">
						<img v-bind:src="userAvatar" class="image is-32x32 avatar">
					</router-link>
				</div>
				<div class="media-content">
					<div id="editor" class="editor"></div>
				</div>
				<div class="media-right">
					<a class="button is-text btn-reply" :class="{'is-loading': BtnCommentisLoading}" :disabled="BtnCommentDisabled" @click="doThat">发布</a>
				</div>
			</div>
		</div>

		<div class="comments" v-if="comments">
			<div class="box" v-for="comment in comments" :key="comment.id">
				<div class="media editor-header">
					<div class="media-left avatar">
						<router-link :to="{name:'u',params: {uid: comment.authorid}}">
							<img v-bind:src="comment.avatar" class="image is-28x28 avatar">
						</router-link>
					</div>
					<div class="media-content">
						<router-link :to="{name:'u',params: {uid: comment.authorid}}">
							{{ comment.author }}
						</router-link>
						<span>
							<small class="post_date" :title="comment.date_post_title">{{ comment.date_post }}</small>
						</span>
					</div>
				</div>
				<div v-html="comment.comment" class="comment_msg"></div>
				<div class="control">
					<a class="button is-text btn-comment-reply" @click="replyComment(comment.id, comment.author)">回复</a>
				</div>
			</div>
		</div>

		<div class="comments empty" v-else></div>
	</section>
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
			articleLoading: true,
			userAvatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			replyHeader: '',
			selfHeader: '',
			comments: [],
			count: 0,
			BtnCommentDisabled: true,
			BtnCommentisLoading: false
		}
	},
	components: {//eslint-disable-line
		RemoteJs
	},
	computed: {
		counts() {
			this.BtnCommentDisabled = this.count ? false : true
		}
	},
	watch: {
		counts: (_new) => {
			// console.log(Vue.prototype)
			// if(_new > 0) {
			// 	Vue.prototype.BtnCommentDisabled = false
			// 	return
			// }
			// Vue.prototype.BtnCommentDisabled = true
		}
	},
	beforeMount () {			
		// this.userAvatar = this.GLOBAL.api + '/avatar/' + localStorage.getItem('userid') + '/0'
		this.userAvatar = this.$store.state.userinfo.avatar + '!avatar_small',

		this.$http.get('/article/' + this.$route.params.id)
			.then((response) => {
				document.title = response.data.result.subject + ' -- Mabuzki.com'
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

		this.$http.get('/comment-' + this.$route.params.id)
			.then((response) => {
				this.comments = response.data.comments
			})
			.catch(function (error) {
				console.log(error)
			})

				// setTimeout(function () {
				// 	target.classList.remove('lazyloaded')
				// }, 300)
		// 	}
		// })
	},
	beforeDestroy () {
		// document.removeEventListener('lazybeforeunveil')
		this.comments = false
	},
	methods: {
		doThat: function () {
			if (!this.$store.state.userinfo.id) {
				this.$toasted.show('您尚未登陆')
				return false
			}

			this.count = tinymce.activeEditor.plugins.wordcount.getCount()
			if (this.count < 1) {
				this.$toasted.show('还没有输入意见')
				return false;
			}

			var comment = tinyMCE.activeEditor.getContent();
			this.BtnCommentisLoading = true
			this.$http.post('/comment',
				{
					articleid: this.$route.params.id,
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
			// let ua = navigator.userAgent
			// let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
			// let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
			// let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
			// let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
			// if ( android || ipad || ipod || iphone) {
			// 	return false
			// }
			var selector
			if( this.$route.meta.showReply ) {
				selector = '#editorMini'
			} else {
				selector = '#editor'
			}

			var __self = this

			var config = {
				selector: selector,
				menubar: false,
				// toolbar: 'bold italic strikethrough link | bullist blockquote',
				toolbar: '',
				inline: true,
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
					editor.on('NodeChange', () => {
						this.count = tinymce.activeEditor.plugins.wordcount.getCount()
					})

					editor.on('Focus', () => {
						
					})

					editor.on('Blur', () => {
						
						if (editor.getContent()) {
							editor.contentAreaContainer.classList.add('noplaceholder')
						} else {
							editor.contentAreaContainer.classList.remove('noplaceholder')
						}
					})
				},
				setup: (editor) => {
					//console.log('setup:'+editor)
				}
			}

			tinymce.init(config)
		},
		replyComment(id, name) {
			tinymce.get('editor').setContent('')
			tinymce.get('editor').insertContent('@'+name+'&nbsp;')
			tinymce.get('editor').focus()
		}
	}
}
</script>

<style scoped>
.comments {
	margin-bottom: 8rem;
}
.comments.empty::before {
	content: '暂无评论'
}
.comments .media-content {
	line-height: 28px
}
.comments .comment_msg {
	margin: .75rem 0
}
.button.is-text {
	margin-top: 4px;
	font-weight: 700;
	color: #6200EE;
	text-decoration: none
}
.button.btn-comment-reply {
	padding: 0;
	height: 1.5em;
}
</style>

<style>

.page-article header { margin-bottom: 3.5rem; }
.page-article header .author { min-height: 48px; }
.page-article header p.date { font-size: .7em; color: #A7A7A7 }
.page-article header h1 { margin-top: 1rem; font-weight: normal; line-height: inherit; }
.page-article article.is-loading header h1 {
	position: relative;
	width: 70%;
	height: 55px;
}

.page-article article.is-loading header span.username {
	margin-top: 10px;
	display: inline-block;
	width: 80px;
	height: 20px;
}

.page-article article.is-loading .article-content>div {
	height: 28px;
	margin-bottom: 1rem;
}
.page-article article.is-loading .article-content .content-4 {
	width: 65%;
}

.page-article article.is-loading .article-content .content-3 {
	width: 30%;
}

.article-content p {
	margin-bottom: 1.5rem
}
.page-article figure {
	text-align: center;
	margin: 1.5rem -1.5rem;
}
.page-article .image img { 
	display: inline-block;
	width: auto;
	max-width: 100%;
}
.page-article #editor {
	margin: .5rem 0;
	outline: none;
}

.page-article #editor::before {
	position: absolute;
	content: '添加评论...';
	cursor: text
}

.page-article #editor.mce-edit-focus::before, .page-article #editor.noplaceholder::before {
	content: '';
	display: none;
}

.page-article .article-editor {
	margin: 0 0 3rem;
}
.comments .box {
	border: none;
	border-radius: 0;
	margin-bottom: 0;
	padding-top: 0
}

.comments .box:not(:first-of-type) {
	border-top: 1px solid #e5e5e5;
	padding-top: 1.5rem
}
.page-article .comments:empty::before { content: "暂无评论"; width: 100%; display: block; text-align: center; font-size: small; color: #bbbbbb; }
.page-article .article-content { margin-bottom: 4rem; min-height: 260px; }
.page-article .article-detail { margin-bottom: 4rem; }
.tox-tinymce {
	margin: 10px 0
}

@media (max-width: 641px) {
	.page-article .article-editor .avatar {
		display: none
	}
	.page-article .article-editor #editor {
		width: 100%;
		max-height: 72px;
    	overflow-y: auto;
	}

	.page-article .article-editor .media-btn {
		margin-left: auto
	}
}

</style>



