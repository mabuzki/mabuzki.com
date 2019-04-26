<template>
	<div id="site-main">
		<header-container v-if="!$route.meta.hideHeader"/>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!-- <footer-container v-if="this.$store.state.showFooter"/> -->
		<footer-container v-if="!$route.meta.hideFooter"/>
		<modals-container/>
	</div>
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default {
	name: 'App',
	data () {
		return {
			progress: 0,
			error: false,
			direction: 'right'
		}
	},
	methods: {
	},
	components: {
		'header-container': Header,
		'footer-container': Footer
	}
}
</script>

<style scoped>

</style>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>