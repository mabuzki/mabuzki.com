<template id="template">
<div class="box article-editorMini" v-if="this.$store.state.userinfo.id">
	<div id="editorMini" class="editor"></div>
	<div class="media media-btn">
		<a class="button btn-reply" :class="{'is-loading': BtnCommentisLoading}" @click="doThat">回复</a>
	</div>
	<!-- <remote-js :js-url="'../js/tinymce/tinymce.min.js'" :js-load-call-back="loadTinymceJS2"></remote-js> -->
</div>
</template>

<script>
import RemoteJs from '@/components/RemoteJs'

export default {
	name: 'ArticleReply',
	data () {
		return {
			BtnCommentisLoading: false
		}
	},
	components: {//eslint-disable-line
		RemoteJs
	},
	methods: {
		doThat: function () {
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

		loadTinymceJS2 () {//eslint-disable-line
			// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			var config2 = {
				selector: '#editorMini',
				menubar: false,
				// toolbar: 'bold italic strikethrough link | bullist blockquote',
				toolbar: '',
				inline: true,
				resize: false,
				statusbar: false,
				plugins: [
					'link',
					// 'lists',
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
					console.log('setup:'+editor)
				}
			}

			tinymce.init(config2)
		},
	}
}
</script>

<style scoped>
.article-editorMini {
	position: absolute;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex!important;
	outline: none!important;
	margin-bottom: 0!important;
	z-index: 99;
	border-radius: 0!important;
}

.article-editorMini #editorMini {
	width: 100%;
	margin: 0!important;
	max-height: 72px;
    overflow-y: auto;
	outline: none
}

	.article-editorMini .media-btn {
		margin-left: auto
	}

</style>



