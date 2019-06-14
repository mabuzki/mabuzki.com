<template>
<main class="page-hire">
	<section class="section">
		<div class="delta-1"></div>
		<div class="delta-2"></div>
		<div class="box-1"></div>
		<div class="circle-1">
			<div class="circle-1-1"></div>
			<div class="circle-1-2"></div>
			<div class="circle-1-3"></div>
			<div class="circle-1-4"></div>
		</div>
		<div class="circle-2"></div>
		<div class="line1 line">135px</div>
		<div class="line2 line">110px</div>
		<div class="container page-hire">
			<div class="leez">
				<img src="https://junk.mabuzki.com/image/hire_leez.jpg!square_middle" style="width: 100%">
			</div>
			<div class="content">
				<!-- <div class="field is-float-right">
					<img src="../../assets/image/leez.png" style="width: 120px">
				</div> -->

				<div class="field">
					<h2 class="title">Hire me</h2>
					<ul>
						<li>栗宁/男/1983</li>
						<li>工作经验：<span>web开发7年+，php开发2年+</span></li>
						<li>期望职位：<span>web前端工程师，全栈工程师</span></li>
						<li>期望薪资：<span>税前月薪16k，特别喜欢的公司可例外</span></li>
					</ul>
				</div>

				<div class="field">
					<h2 class="title">联系方式</h2>
					<ul>
						<li>Email：ning.leez#gmail.com</li>
						<li>QQ：2936300</li>
						<li>微信号：<br>
							<img src="../../assets/image/wechat.jpg" style="max-width: 30%">
						</li>
					</ul>
				</div>
				
				<div class="field">
					<h2 class="title">工作经历</h2>
					<h5 class="title">淘唛(天津)网络科技有限公司/淘唛商城</h5>
					<small>技术栈：AI、Html5、CSS3、PHP</small>
					<br>
					<time>2018年10月 — 2019年4月</time>
					<ol>
						<li>服务器日常维护；</li>
						<li>商城相关插件开发及日常维护；</li>
						<li>商城营运及专题策划；</li>
						<li>公众号维护</li>
					</ol>
				</div>

				<div class="field">
					<h5 class="title">深圳链通网络科技有限公司/乐享区块链</h5>
					<small>技术栈：AI、Html5、CSS3、PHP、Canvas、Hbuilder</small>
					<br>
					<time>2018年3月 — 2018年7月</time>
					<ol>
						<li>乐享区块链平台vi设计；</li>
						<li>乐享区块链平台PC端和wap端布局设计开发及后续优化；</li>
						<li>基于Hybrid App开发乐享链安卓端手机APP</li>
					</ol>
				</div>

				<div class="field">
					<h5>聊城康莱德健康产业有限公司/乐众挖金网</h5>
					<small>技术栈：FW、AI、Html5、CSS3、PHP、Canvas</small>
					<br>
					<time>2016年10月 — 2017年9月</time>
					<ol>
						<li>乐众挖金网PC端和wap端布局重新设计开发及后续优化；</li>
						<li>乐众挖金网交易模块的开发工作；</li>
						<li>乐众挖金网客服系统维护及功能优化；</li>
					</ol>
				</div>

				<div class="field">
					<h5>山东高唐汇鑫网络科技服务中心</h5>
					<small>技术栈：FW, AI, Html5, CSS3, PHP</small>
					<br>
					<time>2012年9月 — 2016年7月</time>
					<ol>
						<li>淘宝卖家业务培训；</li>
						<li>淘宝店铺装修业务，制图及sdk商业模板制作；</li>
						<li>discuz、wordpress模板制作；</li>
						<li>上海赢品商贸外包项目制作及维护：潮妈帮品牌论坛积分商城界面设计开发及后续优化；宝贝购品牌商城PC端及APP端界面设计、海外购品牌界面设计、微信活动页面设计及开发；</li>
						<li>其他一些网站外包工作</li>
					</ol>
				</div>

				<div class="field">
					<h2>技能清单</h2>
					<ul>
						<li>Web开发：<br>PHP</li>
						<li>Web框架或程序：<br>Lavarel/Wordpress/Discuz</li>
						<li>前端框架：<br>Vue/JQuery/Bootstrap/Semantic UI/Bulma/Framework7</li>
						<li>前端工具：<br>NodeJS/WebPack/Npm/Postman/Git</li>
						<li>开发工具：<br>VSCode/Hbuilder/Notepad++</li>
						<li>设计工具：<br>AI/Fireworks</li>
						<li>数据库相关：<br>MySQL</li>
						<li>服务器相关：<br>CentOS配置及日常维护</li>
					</ul>
				</div>

				<div class="field">
					<h2 class="title">个人网站</h2>
					<p><a href="https://mabuzki.com">mabuzki.com</a></p>
				</div>

				<!-- <div class="field">
					<h2 class="title">个人兴趣</h2>
					<p>唱歌、美食、欧美影视粉</p>
				</div> -->

				<hr>

				<div class="field">
					<h2 class="title">致谢</h2>
					<p>感谢您花时间阅读我的简历，期待能有机会和您共事。</p>
				</div>

				<div class="field">
					<router-link to="./">&lt; 我的个人项目 &gt;</router-link>
				</div>

			</div>
		</div>
	</section>
</main>
</template>

<script>
import './../../sass/hire.scss'
export default {
	name: 'hire',
	beforeRouteEnter (to, from, next) {
		document.querySelector('html').classList.remove('has-navbar-fixed-top')
		document.title = '栗子的简历'
		next(vm => {
			vm.$store.commit('showFooter', false)
		})
	},
	beforeRouteLeave (to, from, next) {
		this.$store.commit('showFooter', true)
		next()
	},
}
</script>

<style scoped>
.page-hire {
	padding-top: 0;
	overflow: hidden;
	background: url(../../assets/image/hire_me_bg.jpg);
}
.page-hire section {
	position: relative;
	background: rgba(255, 255, 255,.96);
}
@media (max-width: 660px) {
	.page-hire section {
		padding: 0
	}
}
.page-hire .container {
	padding: 2rem;
	/* border: 2px solid #0058bc; */
	/* background: #FFF; */
	background: rgba(255, 255, 255,.96);
	color: #222;
	box-shadow: 0 0 15px rgba(78, 50, 146, 0.4);
	/* border-radius: 2rem; */
	font-family: "plantc", "Source Han Serif", serif;
	font-size: calc(18px + (26 - 18) * var(--view-minmax));
}
@media (max-width: 660px) {
	.page-hire .container {
		padding: 1.5rem;
		border: none;
		box-shadow: none;
		border-radius: 0
	}
}
.line {
	background: #0058bc;
	font-size: xx-small;
	height: 1px;
}
.line1 {
	position: absolute;
	width: 135px;
	left: 50%;
	top: 18%;
	margin-left: -320px;
	
}
.line2 {
	position: absolute;
	width: 110px;
	transform: rotate(90deg);
	left: auto;
	bottom: auto;
	right: 50%;
	top: 20%;
	margin-right: -410px;
}
.line1::before, .line2::before {
	content: '';
	width: 1px;
	height: 7px;
	float: left;
	margin-top: -3px;
	background: #0058bc
}
.line1::after , .line2::after {
	content: '';
	width: 1px;
	height: 7px;
	float: right;
	margin-top: -3px;
	background: #0058bc
}
.grid-1 {
	position: absolute;
	border: 1px solid #0058bc;
	margin: 20px;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0
}
.grid-2 {
	position: absolute;
	border: 1px solid #0058bc;
	margin: 24px;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.delta-1 {
	position: absolute;
	width: 0;
	height: 0;
	right: 22%;
	top: 35%;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 18px solid #0058bc;
}
.box-1 {
	position: absolute;
	right: -10rem;
	bottom: -20rem;
	width: 30rem;
	height: 30rem;
	border: 2px dashed #0058bc;
	transform: rotate(45deg);
	animation: rotateReverse 80s infinite linear
}
.circle-1 {
	position: relative;
	top: 94vh;
    left: 50%;
    margin-left: -330px;
}
.circle-1-1 {
	position: absolute;
	left: -8rem;
	top: -8rem;
	width: 16rem;
	height: 16rem;
	border-radius: 50%;
	border: 1px solid #0058bc;
	animation: circleScale 20s infinite linear
}
.circle-1-2 {
	position: absolute;
	left: -7rem;
	top: -7rem;
	width: 14rem;
	height: 14rem;
	border-radius: 50%;
	border: 1px dashed #0058bc;
	animation: rotate 20s infinite linear
}
.circle-1-3 {
	position: absolute;
	left: -6.5rem;
	top: -6.5rem;
	width: 13rem;
	height: 13rem;
	border-radius: 50%;
	border: 1px solid #0058bc;
	animation: circleScale 20s infinite linear
}
.circle-1-4 {
	position: absolute;
	left: -6.3rem;
	top: -6.3rem;
	width: 12.6rem;
	height: 12.6rem;
	border-radius: 50%;
	border: 1px solid #0058bc;
	animation: circleScale 20s infinite linear
}
div.leez {
	margin-left: -2rem;
    margin-top: -2rem;
	margin-right: -2rem;
	margin-bottom: 6rem;
}
h2 {
	padding-bottom: 2rem;
}

h5 {
	margin-bottom: 0!important
}

time {
	font-size: smaller;
	color: #275489
}
small {
	display: inline-block;
    background: #FAFAFA;
	padding: 0 5px;
	font-size: smaller;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    margin: 5px 0 0;
}
.field {
	margin-bottom: 6rem;
}
@media (max-width: 641px) {
	li>span{
		display: block
	}
}
</style>

<style>
@keyframes rotate {
	0% {
		transform:rotate(0) scale(1);
	}
	50% {
		transform:rotate(180deg) scale(1.3);
	}
	100% {
		transform:rotate(360deg) scale(1);
	}
}

@keyframes rotateReverse {
	0% {
		transform:rotate(0);
	}
	100% {
		transform:rotate(-360deg);
	}
}

@keyframes circleScale {
	0% {
		transform:scale(1);
	}
	50% {
		transform:scale(1.3);
	}
	100% {
		transform:scale(1);
	}
}
</style>


