<template>
	<main>
		<div class="container page-setting">
			<div class="columns is-mobile">
				<div class="column is-narrow">
					<div class="field has-addons" style="width: 50%;">
						<p class="control">
							<router-link to="/setting/profile" class="button">资料</router-link>
						</p>
						<p class="control">
							<router-link to="/setting/account" class="button">设置</router-link>
						</p>
					</div>
				</div>
				
				<div class="column">
					<div class="buttons has-addons is-right">
						<a class="button"
							@click="handleModalLogoutOpen()">登出</a>
					</div>
				</div>
			</div>
		</div>
		<router-view/>
    </main>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
		handleModalLogoutOpen () {
			this.$bus.emit('handleModalLogoutOpen')
		}
	}
}
</script>

