<template>
<main class="index">
	<div class="index-baner">
		<div class="video-bg" v-if="showVideoBg">
			<video preload="auto" poster="../assets/image/the_beauty_of_a_second.jpg" autoplay loop muted>
				<source src="../assets/image/the_beauty_of_a_second.mp4" type="video/mp4">
				<source src="../assets/image/the_beauty_of_a_second.webm" type="video/webm">
			</video>
		</div>
		<div class="image-bg" v-else></div>
		<div class="index-content">
			<div class="tips">
				<p>
					◇ 网站架构/内容重新构建中 ◇<br>Base on Laravel & Vue
				</p>
				<router-link class="button is-black is-inverted is-outlined is-large"  to="/hire-me">联系我</router-link>
			</div>
			
			<!-- <a class="button is-black is-inverted is-outlined is-large" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2936300&amp;site=qq&amp;menu=yes" role="button" target="_blank">联系我</a> -->
		</div>
	</div>
</main>
</template>

<script>
export default {
	data() {
		return {
			showVideoBg: true
		}
	},
	beforeMount () {
		var ua = navigator.userAgent;
		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

		if ( android || ipad || ipod || iphone) {
			this.showVideoBg = false
		}

		var navbar = document.querySelector('header.navbar')
		document.querySelector('#site-main').classList.add('page-index')
		navbar.classList.add('is-black')
		navbar.classList.add('is-transparent')
		document.querySelector('html').classList.remove('has-navbar-fixed-top')
		document.querySelector('footer.footer').classList.add('is-transparent')
	},
	beforeDestroy () {
		var navbar = document.querySelector('header.navbar')
		document.querySelector('#site-main').classList.remove('page-index')
		navbar.classList.remove('is-black')
		navbar.classList.remove('is-transparent')
		document.querySelector('html').classList.add('has-navbar-fixed-top')
		document.querySelector('footer.footer').classList.remove('is-transparent')
	}
}
</script>
