<template>
<main class="page-draft">
	<section>
		<form>
			<div class="console">
				<span class="icon iconfont" @click.stop.prevent="insertImage">&#xe601;</span>
				<span class="icon iconfont" @click.stop.prevent="insertVideo">&#xe741;</span>
				<span class="icon iconfont" @click.stop.prevent="insertHr">&#xe73a;</span>
				<span class="icon iconfont is-right" @click="addTag">&#xe737;</span>
			</div>
			<div class="field editor-section">
				<h1 id="editor_title" class="title is-2"></h1>
				<div id="editor_content"></div>
				<!-- <vue-tags-input
					v-model="tag"
					placeholder="添加标签"
					:tags="tags"
					:validation="validation"
					:max-tags="5"
					:maxlength="10"
					:autocomplete-items="filteredItems"
					@tags-changed="newTags => tags = newTags"
					/> -->
			</div>
		</form>
		
		<remote-js :js-url="'../js/tinymce/tinymce.min.js'" :js-load-call-back="loadTinymceJS"></remote-js>
	</section>
</main>
</template>

<script>
import RemoteJs from '@/components/RemoteJs'
import VueTagsInput from '@johmun/vue-tags-input'
// import { type } from 'os';

export default {
	name: 'draft',
	data () {
		return {
			publicPath: process.env.BASE_URL,
			preSubject: '',
			subject: '',
			content: '',
			editorFocus: false,
			editorFocused: false,
			toolbarStyle: {
				top: '0',
				visibility: ''
			},
			posPath: ['Kramer'],
			tag: '',
			tags: [],
			autocompleteItems: [{
				text: 'Vue',
			}, {
				text: 'JavaScript',
			}, {
				text: 'CSS',
			}, {
				text: 'Html5',
			}, {
				text: '设计',
			}, {
				text: 'PHP',
			}],
			validation: [{
				classes: 'min-length',
				rule: tag => tag.text.length < 2
			}, {
			// 	classes: 'no-numbers',
			// 	rule: /^([^0-9]*)$/,
			// 	disableAdd: true
			// }, {
				classes: 'avoid-item',
				rule: /^(?!Cannot).*$/,
				disableAdd: true
			}, {
				classes: 'no-braces',
				rule: ({ text }) => text.indexOf('{') !== -1 || text.indexOf('}') !== -1,
				disableAdd: true
			}],			
		}
	},
	components: {//eslint-disable-line
		RemoteJs
	},
	computed: {
		userStatus() {
			let userinfo = {
				id: this.$store.state.userinfo.id
			}
			return userinfo
		},
		filteredItems () {
			return this.autocompleteItems.filter(i => {
				return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
			})
		}
	},
	watch: {
		userStatus: function (_new) {
			if (_new.id) {
				// this.$bus.emit('handleNavbarShowBtnDraft', 'hide')
				// this.$bus.emit('handleNavbarShowBtnPublish', 'show')
			}
		},
		preSubject: {
			handler(newval) {
				console.log(newval)
				this.subject = newval.replace(/"([^"]*)"/g, '“$1”').replace(/[\r\n]/g, '').replace(/<[^>]+>|&[^>]+;/g,"").trim()
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		document.title = '草稿: 撰写中...'
		next(vm => {
			vm.$store.commit('showFooter', false)

			if ( !vm.$store.state.userinfo.id ) {
				vm.$bus.emit('handleModalLoginOpen')
				vm.$toasted.show('请重新登录')
				return false
			}

			if (vm.$store.state.userinfo.id) {
				vm.$store.commit('showBtnPublish', true)
			}
		})
	},
	beforeRouteLeave (to, from, next) {
		this.$store.commit('showFooter', true)
		this.$store.commit('showBtnPublish', false)
		this.$bus.off('handleDraftPublish')
		next()
	},
	beforeDestroy () {
	},
	mounted () {
		let __self = this
		// let __id = this.$utils.getUrlKey('edit')
		let __id = ''

		// if (this.$store.state.userinfo.needverify) {
		// 	this.$toasted.show('非认证账号不能发布文章')
		// }

		if (__id) {
			document.title = '文档编辑中...'
			if ((/(^[1-9]\d*$)/.test(__id))) {
				__self.$axios.get('/matrix/article-' + __id)
					.then((response) => {
						console.log(response)
						if (__self.GLOBAL.uid === response.data.result.authorid) {
							document.title = '编辑状态'
							__self.subject = response.data.result.subject
							__self.content = response.data.result.content
							if (response.data.result.tags) {
								console.log(response.data.result.tags.split(','))
								// __self.tags = response.data.result.tags.split(',')
							}
							let figcaption = document.querySelectorAll('figcaption')
							if (figcaption.length) {
								for (let i = 0; i < figcaption.length; i++) {
									figcaption[i].setAttribute('contenteditable', true)
								}
							}
							return true
						}
						return false
					})
					.catch((error) => {
						console.log(error)
						return false
					})
			}
		}
		this.$bus.off('handleDraftPublish')
		this.$bus.on('handleDraftPublish', () => { // bus事件，控制头部发布按钮
			this.draftPublish()
		})
	},
	methods: {
		insertImage () {
			// tinyMCE.editors.editor_content.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;')
			var __self = this
			//eslint-disable-next-line
			var editor = tinyMCE.editors.editor_content
			var input = document.createElement('input')
			console.log(input)
			input.setAttribute('type', 'file')
			input.setAttribute('accept', 'image/*')
			input.setAttribute('multiple','multiple')
			input.onchange = function () {
				if(this.files.length > 9) {
					__self.$toasted.show('最多一次可选9张图片')
				}

				//原生js获取的DOM集合是一个类数组对象，所以不能直接利用数组的方法（例如：forEach，map等），需要进行转换为数组后，才能用数组的方法
				let lists = Array.from(this.files)
				console.log(lists)
				
				lists.forEach( __file => {
					var data = new FormData()
					var reader = new FileReader()
					var id, img, image
					reader.readAsArrayBuffer(__file)
					reader.onload = (e) => {
						id = 'blobid-' + (new Date()).getTime()
						if (typeof e.target.result === 'object') {
							img = window.URL.createObjectURL(new Blob([e.target.result]))
						} else {
							img = e.target.result
						}
						editor.insertContent('<figure class="image"><img src="'+ img +'" id="'+ id +'" class="local" /><figcaption></figcaption></figure><p>&nbsp;</p>')

						image = document.querySelector('#' + id)
						data.append('Filedata', __file)
						__self.$http.post('/upload/photo', data, {
							headers: { 'Content-Type': 'multipart/form-data' },
							timeout: 20000,
							onUploadProgress: progressEvent => {
								if (progressEvent.lengthComputable) {
									// image.parentNode.dataset.progress = progressEvent.loaded / progressEvent.total * 100
								}
							}
						}).then((response) => {
							console.log(image)
							console.log(response)
							if (response.data.success) {
								image.classList.remove('local')
								image.src = response.data.image
								image.dataset.imageId = response.data.imageid
							}
						}).catch(function (error) {
							console.log(error)
						})
					}
				})
			}
			input.click()
		},
		insertVideo () {
			this.$toasted.show('上传影片功能暂未开放')
		},
		insertHr () {
			tinyMCE.editors.editor_content.insertContent('<hr/>')
		},
		addTag () {
			this.$toasted.show('标签功能暂未开放')
		},
		loadTinymceJS () {//eslint-disable-line
			// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			var __self = this
			var __file
			var dfreeHeaderConfig = {
				selector: '#editor_title',
				menubar: false,
				inline: true,
				toolbar: false,
				plugins: [],
				language: 'zh_CN',
				resize: false,
				object_resizing : false,
				init_instance_callback: function (editor) {
					editor.on('NodeChange', function () {
					})

					editor.on('Focus', function () {

					})

					editor.on('Blur', function () {
						if (editor.getContent()) {
							editor.contentAreaContainer.classList.add('noplaceholder')
						} else {
							editor.contentAreaContainer.classList.remove('noplaceholder')
						}
					})
				},
			}
			var dfreeBodyConfig = {
				selector: '#editor_content',
				menubar: false,
				inline: true,
				resize: false,
				plugins: [
					// 'autolink',
					'link',
					'lists',
					'wordcount',
					// 'media',
					// 'table',
					// 'textcolor',
					'image',
					'quickbars',
					'paste'
				],
				language: 'zh_CN',
				toolbar: false,
				resize: false,
				object_resizing : false,
				// quickbars_insert_toolbar: 'customInsertButton',
				quickbars_insert_toolbar: '',
				image_caption: true,
				contextmenu: '',//屏蔽右键上下文
				quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
				powerpaste_word_import: 'clean',
				powerpaste_html_import: 'clean',
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
				}
			}
			tinymce.init(dfreeHeaderConfig)
			tinymce.init(dfreeBodyConfig)
		},
		draftPublish () {
			var btn = document.querySelector('header.navbar .link-draft').classList
			var editors = tinyMCE.editors
			var images = document.querySelectorAll('figure img.local')
			this.subject = editors.editor_title.getContent()
			this.content = editors.editor_content.getContent() ? editors.editor_content.getContent({format: 'raw'}) : editors.editor_content.getContent()
			this.content = this.content.replace(editors.editor_content.startContent,'')
			this.content = this.content.replace('<br data-mce-bogus="1">','')
			this.content = this.content.replace('<br data-mce-bogus="1"/>','')
			
			if (!this.content) {
				this.$toasted.show('要先写点什么才行')
				return false
			}
			if (images.length) {
				this.$toasted.show('还有图片未上传完成')
				return false
			}
			btn.add('is-loading')
			this.$http.post('/publish',
				{
					subject: this.subject,
					content: this.content,
					tags: this.tags
				})
				.then((response) => {
					if (!response.data.success) {
						btn.remove('is-loading')
						return false
					}
					// eslint-disable-next-line
					setTimeout(() => {
						this.$router.push({path: '/article/' + response.data.article_id})
					}, 2000)
				})
				.catch(function (error) {
					btn.remove('is-loading')
					console.log(error)
				})
		}
	}
}
</script>

<style scoped>
section {
	padding-left: 0;
	padding-right: 0
}
.editor-section { position: relative; max-width: 640px; min-height: 170px; margin: 0 auto 3rem; }
input#tags { border: none; padding: 0; }
#editor_title { max-width: 640px; font-weight: 100; outline: none; position: relative; margin: 0 auto 2rem; padding: 0 6px; }
#editor_title::before { content: '标题'; color: #a7a7a7; position: absolute; transition: .15s all ease-in-out; font-size: 1em; top: 0; bottom: 0; }
#editor_title.mce-edit-focus::before , #editor_title.noplaceholder::before { font-size: 11px; position: absolute; top: -16px; } 

#editor_content { min-height: 15.5rem; padding: 0 6px; outline: none; line-height: 1.85em; position: relative; outline: none!important; }
#editor_content::before { content: '正文'; color: #a7a7a7; font-size: 2.6em; font-weight: 100; position: absolute; top: 0; cursor: text; transition: .15s all ease-in-out; }
#editor_content.mce-edit-focus::before , #editor_content.noplaceholder::before { font-size: 11px; position: absolute; top: -26px; }

.editor-section .over-bottom, .editor-section .over-top { position: relative; }
/*.editor-section .over-bottom:after, .editor-section .over-top:before { content: ''; display: block; position: absolute; left: 0; right: 0; width: 100%; height: 0; border-bottom: 2px dashed #529ecc; }*/
.editor-section .over-top { padding-top: 30px; }
.editor-section .over-top:before { content: ''; display: block; position: absolute; left: 0; top: 0; right: 0; width: 100%; height: 0; border-bottom: 2px dashed #529ecc; }
.editor-section .over-top:before { margin-top: -9px; margin-bottom: 7px; }
.editor-section .over-bottom:after { bottom: 0; margin-top: 7px; margin-bottom: -9px; }

.tags-input-default-class {
    padding: .5rem .25rem;
}

.tags-input-remove {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    overflow: hidden;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    background: #5dc282;
    height: 2px;
    margin-top: -1px;
}

.tags-input-remove:before {
    transform: rotate(45deg);
}
.tags-input-remove:after {
    transform: rotate(-45deg);
}

.tags-input input:focus {
    outline: none;
}
.console {
	background: #FFF;
	position: fixed;
    bottom: 0;
    width: 100%;
	height: 4rem;
	z-index: 99;
	box-shadow: 0 0 5px rgba(0,0,0,.1)
}

.console {
	padding: 1.3rem 0 0 2rem ;
}
.console span {
	cursor: pointer;
}
.console .iconfont {
	font-size: 1.35em;
	margin-right: 2rem;
}
.console .iconfont.is-right {
	float: right
}
</style>
<style>
.ti-input {
	border: none!important
}
figure {
	margin: 2rem 0;
}
figure.image img {
	margin: auto;
	width: auto;
	max-width: 100%;
	outline: 3px solid #FFF;
}
/* figure.image.local::before {
    content: '';
    background: rgba(255,255,255,.8);
    width: 100%;
    height: 100%;
    font-size: 4rem;
    font-weight: 100;
    position: absolute;
    top: -3px;
    right: 0;
    text-align: center;
}
figure.image.local::after {
    content: attr(data-progress);
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 4rem;
    width: 150px;
    height: 100px;
    line-height: 100px;
    margin-left: -75px;
    margin-top: -68px;
	text-align: center;
	color: rgba(0,0,0,.6)
} */
figure.image img:hover {
	outline: 3px solid #5dc282
}
figcaption:empty::before {
	content: '图片说明';
	color: #808080;
	font-size: smaller;
	text-align: center
}
.mce-content-body [contentEditable=false][data-mce-selected] {
	cursor: default!important;
	outline: none!important;
}
.mce-content-body [contentEditable=false][data-mce-selected] img {
	outline: 3px solid #03a87c
}
.mce-content-body [contentEditable=false] [contentEditable=true]:focus, .mce-content-body [contentEditable=false] [contentEditable=true]:hover {
	outline: none!important
}
figcaption {
	text-align: center;
	margin-top: 1rem;
	color: rgba(0,0,0,.6)
}
</style>
