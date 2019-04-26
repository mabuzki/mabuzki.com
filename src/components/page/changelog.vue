<template>
<main class="page-changelog">
	<section class="section">
		<div class="container">
			<h2 class="title is-3">
				项目说明<span class="title is-5">/Project description</span>
			</h2>
			<div class="content">
				Mabuzki.com系统后端基于Laravel，前端基于Vue全家桶(Vue + Vue Router + Vuex)，框架为前后端分离状态，利于后期封装。
				<br>
				PC/Mobile布局及其他功能还在持续编写调整中。
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
						{{ ver }}<em class="title is-6">2019/4/17</em>
					</h4>
					<ul>
						<li>前端: avatar显示方式调整</li>
						<li>后端: 精简服务</li>
						<li>后端: avatar处理流程调整</li>
						<li>后端: avatar直接上传至oss</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						0.4.1<em class="title is-6">2019/4/17</em>
					</h4>
					<ul>
						<li>前端: Vue全家桶依赖库更新</li>
						<li>前端: 文章发布页编辑器弃用Ckeditor, 启用TinyMCE</li>
						<li>前端: 页头优化</li>
						<li>前端: 页脚显示判断加入</li>
						<li>前端: 文章聚合页/文章单页/个人首页现在能正确的解析附件图片</li>
						<li>后端: 解析附件图片方式调整</li>
						<li>后端: 文章发布流程调整</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						0.3.3<em class="title is-6">2019/4/2</em>
					</h4>
					<ul>
						<li>前端: 文章聚合页补全</li>
						<li>前端: 个人页面文章列表补全</li>
						<li>后端: api接口地址调整</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						0.2.7<em class="title is-6">2019/3/29</em>
					</h4>
					<ul>
						<li>前端: 登录失败流程fix, 不再弹出两个toast</li>
						<li>前端: 注册页面增加了体验账号登录</li>
						<li>前端: 文章发表页css样式调整</li>
						<li>前端: 文章发布页现在拒绝为未认证用户服务</li>
						<li>前端: 页头发布按钮判断规则优化</li>
						<li>后端: 文章发布页现在拒绝为未认证用户服务</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						0.2.0<em class="title is-6">2019/3/28</em>
					</h4>
					<ul>
						<li>前端: Vuex针对令牌优化</li>
						<li>前端: 注册/登录流程优化</li>
						<li>前端: 用户页不同用户切换逻辑bug修复</li>
						<li>前端: 用户页权限优化，设置页面布局优化</li>
						<li>前端: Toast现在集中发放，单独post不再接管此接口</li>
						<li>后端: auth权限判断调整</li>
						<li>后端: auth key重新签发功能优化</li>
					</ul>
				</div>
				<div class="field">
					<h4 class="title">
						0.1.0<em class="title is-6">2019/3/14</em>
					</h4>
					<ul>
						<li>online</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</main>
</template>

<script>

export default {
	data() {
		return {
			ver: window.ver
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
em.title {
	margin-left: 10px;
	font-style: normal
}

.content {
	font-size: smaller
}
</style>
