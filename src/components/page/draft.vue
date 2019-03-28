<template>
<main class="draft">
	<form>
		<div class="field editor-section">
			<h1 id="editor_title" class="title is-2"
				@input="subjectInput($event)"
				@keydown="subjectKeydown($event)"
				@paste="subjectPaste($event)"
				contenteditable="true"
				></h1>
			<div id="editor_content"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				></div>
			<vue-tags-input
				v-model="tag"
				placeholder="添加标签"
				:tags="tags"
				:validation="validation"
				:max-tags="5"
				:maxlength="10"
				:autocomplete-items="filteredItems"
				@tags-changed="newTags => tags = newTags"
				/>
		</div>
	</form>
	<remote-js :js-url="'/js/ckeditor5/ckeditor.js'" :js-load-call-back="loadCkeditorJs"></remote-js>
</main>
</template>

<script>
// eslint-disable-next-line
// import Vue from 'vue'
// import VoerroTagsInput from '@voerro/vue-tagsinput'
// Vue.component('tags-input', VoerroTagsInput)
import RemoteJs from '@/components/RemoteJs'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
	name: 'Draft',
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
	watch: {
		content: function(newval) {
			console.log(newval)
		},
		preSubject: {
			handler(newval) {
				console.log(newval)
				this.subject = newval.replace(/"([^"]*)"/g, '“$1”').replace(/[\r\n]/g, '').replace(/<[^>]+>|&[^>]+;/g,"").trim()
			}
		}
	},
	beforeMount () {
		document.title = '草稿: 撰写中...'
		this.$bus.emit('handleNavbarShowBtnDraft', 'hide')
		this.$bus.emit('handleNavbarShowBtnPublish', 'show')
	},
	beforeDestroy () {
		this.$bus.emit('handleNavbarShowBtnDraft', 'show')
		this.$bus.emit('handleNavbarShowBtnPublish', 'hide')
		let styleList = document.querySelectorAll('style')
		let lastStyle = styleList[styleList.length - 1]
		let ckTemp = document.querySelector('.ck-body')
		ckTemp.parentNode.removeChild(ckTemp)
		document.querySelector('head').removeChild(lastStyle)
		global.BalloonEditor = undefined
		global.CKEDITOR_TRANSLATIONS = undefined
		global.CKEDITOR_VERSION = undefined
	},
	mounted () {
		let __self = this
		// let __id = this.$utils.getUrlKey('edit')
		let __id = ''

		let init = function () {
			// document.querySelector('#editor_title').addEventListener('paste', function (e) {
			// 	e.preventDefault()
			// 	if (e.clipboardData && e.clipboardData.getData) {
			// 		let text = e.clipboardData.getData('text/plain')
			// 		// text = text.replace(/"([^"]*)"/g, '“$1”')
			// 		// text = text.replace(/[\r\n]/g, '')
			// 		console.log(text)
			// 		document.execCommand('insertText', false, text)
			// 	} else if (window.clipboardData && window.clipboardData.getData) {
			// 		// let text = window.clipboardData.getData('Text')
			// 		// insertTextAtCursor(text)
			// 	}
			// })

			// document.querySelector('#editor_title').addEventListener('drop', function (e) {
			// 	e.preventDefault()
			// })

			// document.querySelector('#editor_title').addEventListener('keydown', function (e) {
			// 	if (e.keyCode === 13) { // 回车事件
			// 		e.preventDefault()
			// 	}
			// })
		}

		if (__id) {
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

		this.$bus.on('handleDraftPublish', () => { // bus事件，控制头部发布按钮
			this.draftPublish()
		})

		init()
	},
	destroyed() {
		this.$bus.off('handleDraftPublish')
	},
	methods: {
		subjectInput (e) {
			// if(e.data === '"') {
			// 	e.preventDefault()
			// 	document.execCommand('insertText', false, '”')
			// 	console.log('bingo')
			// }
			
			// e.target.innerHTML.replace(/"([^"]*)"/g, '“$1”').replace(/[\r\n]/g, '').replace(/<[^>]+>|&[^>]+;/g,"").trim()
		},
		subjectKeydown (e) {
			// console.log(e)
			// console.log(e.keyCode)
			if(e.shiftKey && e.keyCode === 222) {//屏蔽双引号
				e.preventDefault()
				let range, html
				let node = '”'
				if (window.getSelection && window.getSelection().getRangeAt) {
					range = window.getSelection().getRangeAt(0)
					console.log(range)
				} else if (document.selection && document.selection.createRange) {
					range = document.selection.createRange();
					html = (node.nodeType == 3) ? node.data : node.outerHTML;
					range.pasteHTML(html);
				}
			}
			if(e.keyCode === 13) {// 屏蔽回车事件
				e.preventDefault()
			}
		},
		subjectPaste (e) {
			e.preventDefault()
			if (e.clipboardData && e.clipboardData.getData) {
				let text = e.clipboardData.getData('text/plain')
				text = text.replace(/"([^"]*)"/g, '“$1”')
				text = text.replace(/[\r\n]/g, '')
				document.execCommand('insertText', false, text)
			} else if (window.clipboardData && window.clipboardData.getData) {
				// let text = window.clipboardData.getData('Text')
				// insertTextAtCursor(text)
			}
		},
		loadCkeditorJs () {//eslint-disable-line
			// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			var __self = this
			var __file
			class UploadAdapter {
				constructor (loader) {
					this.loader = loader
					let tmp = Promise.resolve(loader.file) //从object promise里面读出file
					tmp.then(function (result) {
						__file = result
					})
				}

				upload () {
					const data = new FormData()
					data.append('Filedata', __file)
					return new Promise((resolve, reject) => {//eslint-disable-line
						__self.$http.post('/upload/photo', data, {
							headers: { 'Content-Type': 'multipart/form-data' },
							timeout: 20000,
							onUploadProgress: progressEvent => {
								if (progressEvent.lengthComputable) {
									this.loader.uploadTotal = progressEvent.total
									this.loader.uploaded = progressEvent.uploaded
									let ratio = progressEvent.loaded / progressEvent.total * 100
								}
							}
						}).then((response) => {
							if (response.data.success) {
								resolve({
									default: response.data.image,
									imageid: response.data.imageid
								})
							}
						}).catch(function (error) {
							console.log(error)
						})
					})
				}

				abort () {
				}
			}

			// eslint-disable-next-line
			BalloonEditor
				.create(document.querySelector('#editor_content'), {
				})
				.then(editor => {
					editor.model.schema.extend('image', {allowAttributes: ['imageid']})
					editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
						return new UploadAdapter(loader)
					}

					const model = editor.model
					const doc = editor.model.document

					doc.on('change:data', () => {
						const changes = doc.differ.getChanges()
						model.change(writer => {
							for (const entry of changes) {
								if (entry.type === 'attribute' && entry.attributeKey === 'src') {
									console.log(entry)
									// let src = entry.attributeNewValue.split('?imageid=')
									// console.log(document.querySelector('img[src='+src[0]+']'))
									// document.querySelector('img[src=\"'+src[0]+'\"]').dataset.imageid = src[1]
								}

								if (entry.type === 'insert' && entry.name === 'image') {
									const image = entry.position.nodeAfter
									const paragraph = writer.createElement('paragraph')
									writer.insert(paragraph, image, 'after') // 图片上传后插入空白P元素
								}
							}
						})
						__self.content = editor.getData()
					})
				})
		},
		draftPublish () {
			document.querySelector('header.navbar .link-draft').classList.add('is-loading')
			this.$http.post('/publish',
				{
					subject: document.querySelector('#editor_title').innerHTML,
					content: this.content,
					tags: this.tags
				})
				.then((response) => {
					if (!response.data.success) {
						document.querySelector('header.navbar .link-draft').classList.remove('is-loading')
						return false
					}

					// this.$toasted.show('发表成功，即将跳转文章页面')
					// eslint-disable-next-line
					return
					// eslint-disable-next-line
					setTimeout(() => {
						this.$router.push({path: '/article/' + response.data.article_id})
					}, 2000)
				})
				.catch(function (error) {
					document.querySelector('header.navbar .link-draft').classList.remove('is-loading')
					console.log(error)
				})
		},
		onEditorBlur () {
		},
		onEditorFocus () {
			this.editorFocus = true
			if (!this.editorFocused) {
				this.editorFocused = true
			}
		}
	},
	computed: {
		filteredItems () {
			return this.autocompleteItems.filter(i => {
				return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
			})
		}
	}
}
</script>
