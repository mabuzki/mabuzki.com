<template>
<main class="index">
	<div class="index-baner">
		<div class="video-bg">
			<video preload="auto" poster="../assets/image/the_beauty_of_a_second.jpg" autoplay loop muted>
				<source src="../assets/image/the_beauty_of_a_second.mp4" type="video/mp4">
				<!-- <source src="../assets/image/the_beauty_of_a_second.webm" type="video/webm"> -->
			</video>
		</div>
		<div class="video-content">
			<p class="tips">◇ 网站架构/内容重新构建中 ◇<br>Base on Laravel & Vue</p>
			<a class="button is-black is-inverted is-outlined is-large" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2936300&amp;site=qq&amp;menu=yes" role="button" target="_blank">联系我</a>
		</div>
	</div>
</main>
</template>

<script>

export default {
	beforeMount () {
		document.querySelector('#site-main').classList.add('page-index')
		document.querySelector('header.navbar').classList.add('is-black')
		document.querySelector('header.navbar').classList.add('is-fixed-top')
		document.querySelector('header.navbar').classList.add('is-transparent')
		document.querySelector('footer.footer').classList.add('is-transparent')
	},
	beforeDestroy () {
		document.querySelector('#site-main').classList.remove('page-index')
		document.querySelector('header.navbar').classList.remove('is-black')
		document.querySelector('header.navbar').classList.remove('is-fixed-top')
		document.querySelector('header.navbar').classList.remove('is-transparent')
		document.querySelector('footer.footer').classList.remove('is-transparent')
	}
}
</script>
