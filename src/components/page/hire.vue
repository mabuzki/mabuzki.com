<template>
<main>
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
			<h2 class="title is-3">
				Hire me
			</h2>
			<div class="content">
				<div class="field">
					<h4 class="title">联系方式</h4>
					<ul>
						<li>Email：ning.leez#gmail.com</li>
						<li>QQ：2936300</li>
						<li>微信号：mr_madness</li>
					</ul>
				</div>

				<div class="field">
					<h4 class="title">个人信息</h4>
					<ul>
						<li>栗宁/男/1983</li>
						<li>工作经验：web开发7年+，php开发2年+</li>
						<li>期望职位：web前端工程师，全栈工程师</li>
						<li>期望薪资：税前月薪16k，特别喜欢的公司可例外</li>
					</ul>
				</div>
				
				<div class="field">
					<h4 class="title">工作经历</h4>
				</div>

				<div class="field">
					<h5 class="title">淘唛(天津)网络科技有限公司/淘唛商城 (2018年10月~至今)</h5>
					<ol>
						<li>服务器日常维护；</li>
						<li>商城专题策划；</li>
						<li>会员信心统筹收集；</li>
						<li>公众号维护；</li>
						<li>涉及技术栈: AI, Html5, CSS3, PHP</li>
					</ol>
				</div>

				<div class="field">
					<h5 class="title">深圳链通网络科技有限公司/乐享区块链（ 2018年3月 ~ 2018年7月 ）</h5>
				</div>
				<div class="field">
					<h6></h6>
					<ol>
						<li>乐享区块链平台vi设计；</li>
						<li>乐享区块链平台PC端和wap端布局重新设计开发及后续优化；</li>
						<li>基于Hybrid App开发乐享链安卓端手机APP</li>
						<li>涉及技术栈: AI, Html5, CSS3, PHP, Canvas charts, Hbuilder</li>
					</ol>
				</div>

				<div class="field">
					<h5>聊城康莱德健康产业有限公司/乐众挖金网 （ 2016年10月 ~ 2017年9月 ）</h5>
				</div>
				<div class="field">
					<ol>
						<li>乐众挖金网PC端和wap端布局重新设计开发及后续优化；</li>
						<li>乐众挖金网部分特定需求交易模块的开发工作；</li>
						<li>乐众挖金网客服系统维护及功能优化</li>
						<li>涉及技术栈: FW, AI, Html5, CSS3, PHP, Canvas charts</li>
					</ol>
				</div>

				<div class="field">
					<h5>山东高唐汇鑫网络科技服务中心 （ 2012年9月 ~ 2016年7月 ）</h5>
					<ol>
						<li>负责淘宝卖家业务培训；</li>
						<li>淘宝店铺装修业务，制图及sdk商业模板制作；</li>
						<li>discuz、wordpress模板制作；</li>
						<li>上海赢品商贸外包项目制作及维护：潮妈帮品牌论坛积分商城界面设计开发及后续优化；宝贝购品牌商城PC端及APP端界面设计、海外购品牌界面设计、微信活动页面设计及开发</li>
						<li>其他一些网站外包工作</li>
						<li>涉及技术栈: FW, AI, Html5, CSS3, PHP</li>
					</ol>
				</div>

				<div class="field">
					<h4>技能清单</h4>
					<ul>
						<li>Web开发：PHP</li>
						<li>Web框架或程序：Lavarel/Wordpress/Discuz</li>
						<li>前端框架：Vue/JQuery/Bootstrap/Semantic UI/Bulma/Framework7</li>
						<li>前端工具：WebPack/Npm</li>
						<li>开发工具：VSCode/Hbuilder/Sublime text/Notepad++/Postman/Git</li>
						<li>设计工具：AI/Fireworks</li>
						<li>数据库相关：MySQL</li>
						<li>服务器相关：CentOS基础配置及日常维护</li>
						<li>使用语言：普通话/英语(阅读技术文档)</li>
					</ul>
				</div>

				<div class="field">
					<h4 class="title">个人网站</h4>
					<p><a href="https://mabuzki.com">mabuzki.com</a></p>
				</div>

				<div class="field">
					<h4 class="title">个人兴趣</h4>
					<p>唱歌、美食、欧美影视粉</p>
				</div>

				<hr>

				<div class="field">
					<h4 class="title">致谢</h4>
					<p>感谢您花时间阅读我的简历，期待能有机会和您共事。</p>
				</div>

			</div>
		</div>
	</section>
</main>
</template>

<script>
export default {
	name: 'hire'
}
</script>

<style scoped>
main {
	padding-top: 0;
	overflow: hidden;
	background: rgba(255, 255, 255,.9);
}
main section {
	position: relative;
}
main .container {
	padding: 2rem;
    border: 1px solid #0058bc;
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

body {
	background: url(../../assets/image/hire_me_bg.jpg)
}

html.has-navbar-fixed-top, body.has-navbar-fixed-top {
	padding-top: 0;
}

.line {
	background: #0058bc
}
.line1 , .line2 {
	width: 135px;
	height: 1px;
	position: absolute;
	left: 20%;
	bottom: 18%;
	font-size: xx-small
}
.line2 {
	width: 110px;
	transform: rotate(90deg);
	left: auto;
	bottom: auto;
	right: 7%;
	top: 20%;

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
	top: 5rem;
	left: 5rem;
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
</style>


