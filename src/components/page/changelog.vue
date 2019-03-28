<template>
<main>
	<section class="section">
		<div class="container">
			<h2 class="title is-3">
				关于<span class="title is-5">/About</span>
			</h2>
			<div class="content">
				Mabuzki.com现行系统后端基于Laravel，前端使用了Vue全家桶，框架为前后端分离状态，利于后期封装。
				<br>
				PC/Mobile布局及其他功能还在持续编写调整中
			</div>
		</div>
	</section>
	<section class="section">
		<div class="container">
			<h2 class="title is-3">
				更新列表<span class="title is-5">/Changelog</span>
			</h2>
			<div class="content">
				<div class="field">
					<h4 class="title">
						2019/3/28
					</h4>
					<ul>
						<li>前端: Vuex针对令牌优化</li>
						<li>前端: 注册/登录流程优化</li>
						<li>前端: 用户页不同用户切换逻辑bug修复</li>
						<li>前端: 用户页权限优化，设置页面布局优化</li>
						<li>后端: 部分controler auth判断调整</li>
						<li>后端: auth key重新签发功能优化</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						2019/3/14 
					</h4>
					<ul>
						<li>Alpha online</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</main>
</template>

<script>
export default {
}
</script>
