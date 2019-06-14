<template id="template">
	<section class="section">
		<div class="container page-setting-account-section">
			<h2 class="title is-3">资料</h2>
			<div class="field avatar">
				<h4 class="title is-5">头像</h4>
				<div class="media">
					<div class="media-content">
						个性明显的头像能帮助你找到趣味相投的朋友<br>请勿使用暴力色情反动及其他不和谐的图片作为头像
					</div>
					<div class="media-right profile-avatar-editing">
						<div class="profile-avatar-image">
							<img v-bind:src="userAvatar" class="image is-128x128 avatar">
						</div>
						<div class="profile-avatar-overlay"></div>
						<div class="profile-avatar-select">
							<button type="button" class="profile-avatar-picker" @click.prevent.stop="avatar_picker">
								<div class="item pick">
									<i class="fa fa-image"></i>
									更换头像
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			<form method="POST" @submit.prevent="post_signature">
				<div class="field mail">
					<h4 class="title is-5">签名</h4>
					<div class="media">
						<div class="media-content">
							<div class="control has-icons-left has-icons-right">
								<textarea class="textarea" placeholder="个人签名"
									v-model="signature"></textarea>
							</div>
						</div>
						<div class="media-right">
							<button type="submit" class="button" :class="{'is-loading': isLoading}" :disabled="signatureUnLoaded">修改</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import ComponentAvatarCrop from '@/components/setting/avatar_crop.vue'

export default {
	name: 'SettingProfile',
	data () {
		return {
			userAvatar: this.$store.state.userinfo.avatar + '!avatar_large',
			signature: '',
			cropped: null,
			cropResultIsActive: false,
			cropResult: null,
			signatureUnLoaded: true,
			isLoading: false,
		}
	},
	computed: {
		userStatus() {
			let userinfo = {
				avatar: this.$store.state.userinfo.avatar
			}
			return userinfo
		}
	},
	watch: {
		userStatus: function (_new) {
			if (_new.avatar) {//监视用户是否更换了avatar
				this.userAvatar = _new.avatar + '!avatar_large'
			} else {
				this.userAvatar = null
			}
		}
	},
	beforeMount () {
		if ( !this.$store.state.userinfo.id ) return false
		this.$http.get( '/user-profile/' + this.$store.state.userinfo.id )
			.then((response) => {
				this.signature = response.data.userinfo.signature
				this.signatureUnLoaded = false
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	methods: {
		avatar_picker () {
			this.$modal.show(ComponentAvatarCrop, {
			}, {
				name: 'modalAvatarPicker',
				classes: 'modal-avatar-picker',
				draggable: false,
				width: '100%',
				height: '100%',
				clickToClose: false
			})
		},
		post_signature (e) {
			this.isLoading = true
			this.$http.post('/setting-profile-update', {
				signature: this.signature
			})
			.then((response) => {
				this.isLoading = false
			})
			.catch(function (error) {
				console.log(error)
			})
		}
	}
}
</script>

<style scoped>

</style>

