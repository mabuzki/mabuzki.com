<template>
	<div id="site-main">
		<header-container/>
		<keep-alive :include="/a|b/">
			<router-view />
		</keep-alive>		
		<footer-container/>
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
