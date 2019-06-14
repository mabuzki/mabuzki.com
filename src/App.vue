<template>
	<div id="site-main">
		<header-container v-if="!$route.meta.hideHeader"/>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!-- <footer-container v-if="this.$store.state.showFooter"/> -->
		<footer-container v-if="$route.meta.showFooter"/>
		<reply-container v-if="$route.meta.showReply"/>
		<modals-container/>
	</div>
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Reply from '@/components/page/articleReply'
// import BScroll from 'better-scroll'

export default {
	name: 'App',
	data () {
		return {
			progress: 0,
			error: false,
			direction: 'right'
		}
	},
	updated() {
		// let _scroll = new BScroll('main',{
		// 	click: true,
		// 	mouseWheel: {
		// 		speed: 20,
		// 		invert: false,
		// 		easeTime: 300
		// 	}
		// })
	},
	methods: {
	},
	components: {
		'header-container': Header,
		'footer-container': Footer,
		'reply-container': Reply
	}
}
</script>

<style scoped>
/* .navbar.is-fixed-bottom, .navbar.is-fixed-top {
	position: absolute;
} */
/* #site-main {
	margin: 0;
	height: 100%;
	overflow: hidden;
} */
</style>

<style>
/* html, body {
	margin: 0;
	height: 100%;
	overflow: hidden!important;
}
main {
	margin: 0;
	height: 100%;
	overflow: auto!important;
	-webkit-overflow-scrolling: touch;
} */
/* body {
	overflow-y: scroll
} */
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

@keyframes skeleton-stripes {
	0% {
		background-position:0 0
	} to {
		background-position:480px 0
	}
}
.hasLoadingBg {
	background: linear-gradient(90deg,#fafafa,#edeff1,#fafafa);
	background-size: 480px 480px;
	animation: skeleton-stripes 1s linear infinite;
}
</style>