<template>
<div class="profile-avatar-crop" v-bind:class="{ show_cropViewport: cropViewportIsActive, show_result: cropResultIsActive }">
	<h2 class="title is-4">
		<span class="choose">&nbsp;1. 选择图片</span>
		<span class="crop">&nbsp;2. 裁切图片</span>
		<span class="upload">&nbsp;3. 预览上传</span>
	</h2>
	<div class="btnHideModal">
		<a @click="$modal.hide('modalAvatarPicker')">
			下次再说
		</a>
    </div>
	<div class="grid">
		<div class="crop-select">
			<button type="button" @click.prevent.stop="avatar_select">
				<div class="item pick">
					<i class="iconfont has-text-dark">&#xe603;</i>
				</div>
			</button>
		</div>
		<div class="crop-viewport">
			<vue-croppie
				ref=croppieRef
				:enableOrientation="true"
				:enableResize="false"
				:viewport="{ width: 180, height: 180, type: 'square' }"
				:boundary="{ width: 280, height: 280 }"
				@result="result"
				@update="update">
			</vue-croppie>

			<a class="button is-rounded" @click="rechoose()">
				<span class="icon">
					<i class="iconfont has-text-dark">&#xe672;</i>
				</span>
				<span>重新选择</span>
			</a>

			<a class="button is-rounded" @click="rotate(-90)">
				<span class="icon is-small">
					<i class="iconfont has-text-dark">&#xe600;</i>
				</span>
				<span>旋转</span>
			</a>

			<a class="button is-rounded" @click="next()">
				<span class="icon">
					<i class="iconfont has-text-dark">&#xe696;</i>
				</span>
				<span>裁切</span>
			</a>
		</div>
		<div class="crop-result">
			<div>
				<img v-bind:src="cropped">
			</div>

			<a class="button is-rounded" @click="prev()">
				<span class="icon">
					<i class="iconfont has-text-dark">&#xe672;</i>
				</span>
				<span>上一步</span>
			</a>
			<a class="button is-rounded" @click="upload()" v-bind:class="{ 'is-loading': cropUploadIsActive }">
				<span class="icon">
					<i class="iconfont has-text-dark">&#xe660;</i>
				</span>
				<span>保存</span>
			</a>
		</div>
	</div>
</div>
</template>

<style>
.croppie-container {
    width: 100%;
    height: auto;
}
</style>

<script>
import VueCroppie from 'vue-croppie'
import 'croppie/croppie.css'
// eslint-disable-next-line
Vue.use(VueCroppie)

export default {
	data () {
		return {
			cropped: null,
			cropViewportIsActive: false,
			cropResultIsActive: false,
			cropUploadIsActive: false,
			cropResult: null
		}
	},
	beforeMount () {
	},
	beforeDestroy () {
		this.$modal.hide('modalAvatarPicker')
	},
	methods: {
		next () {
			this.cropViewportIsActive = false
			this.cropResultIsActive = true
			let options = {
				type: 'blob',
				format: 'png',
				circle: false
			}

			this.$refs.croppieRef.result(options, (output) => {
				this.cropped = URL.createObjectURL(output)
				this.cropResult = output
			})
		},
		rechoose () {
			this.cropViewportIsActive = false
		},
		prev () {
			this.cropViewportIsActive = true
			this.cropResultIsActive = false
		},
		upload () {
			let data = new FormData()
			data.append('Filedata', this.cropResult, this.userId + '-' + this.GLOBAL.generateRandom(10, false) + '.png')

			this.$http.post('/upload/avatar', data, {
				headers: { 'Content-Type': 'multipart/form-data' },
				timeout: 15000,
				onUploadProgress: progressEvent => {
					this.cropUploadIsActive = true
					if (progressEvent.lengthComputable) {
					}
				}
			}).then((response) => {
				if (response.data.success) {
					this.$store.commit('refreshCacheKey', this.GLOBAL.generateRandom(10, false))
					this.$store.commit('avatarUploaded', this.GLOBAL.avatar + response.data.newAvatar)
					this.$modal.hide('modalAvatarPicker')
					setTimeout(() => {
						this.cropResultIsActive = false
						this.cropUploadIsActive = false
					}, 2000)
				}
			}).catch(function (error) {
				console.log(error)
				this.cropUploadIsActive = false
			})
		},
		// cropViaEvent () {
		// 	this.$refs.croppieRef.result(options)
		// },
		result (output) {
			this.cropped = output
		},
		update (val) {
			// console.log(val);
		},
		rotate (rotationAngle) {
			this.$refs.croppieRef.rotate(rotationAngle)
		},
		avatar_select () {
			let _m = this
			let input = document.createElement('input')
			input.setAttribute('type', 'file')
			input.setAttribute('accept', 'image/*')

			input.onchange = function () {
				let File = this.files[0]
				if (!File.size) {
					alert('获取文件大小失败, 请确认文件类型.')
					return false
				}

				if (File.size > 2 * 1024 * 1024) {
					alert('图片文件过大, 请确认图片文件大小为<2M')
					return false
				}

				let reader = new FileReader()
				reader.onload = function () {
					// let addImageElement;
					// let frag = document.createDocumentFragment(), node, lastNode;
					let url = URL.createObjectURL(_m.GLOBAL.dataURItoBlob(reader.result))
					// let id = 'blobid-' + (new Date()).getTime();

					_m.$refs.croppieRef.bind({
						url: url
					})

					_m.cropViewportIsActive = true
				}
				reader.readAsDataURL(File)
			}
			input.click()
		}
	}
}
</script>

<style scoped>
.v--modal-box input {
	border-bottom: none
}
.button {
	border: none;
}
.v--modal-box a.button:hover {
	background: #FAFAFA;
}
</style>
