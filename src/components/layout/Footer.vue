<template>
<footer class="footer" v-if="showFooter">
	<div class="container">
		<div class="content has-text-centered">
			<small><a href="http://www.miitbeian.gov.cn" target="_blank">鲁ICP备15020058号-1</a></small>
			<br>
			<small>Alpha 0.1.0</small>
			<router-link class="changelog" to="/changelog"><small>ChangeLog</small></router-link>
		</div>
	</div>
</footer>
</template>

<script>
export default {
	data () {
		return {
			showFooter: true
		}
	}
}
</script>
