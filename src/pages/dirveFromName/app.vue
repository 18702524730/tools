<template>
	<div id="app">
		<sebe-header></sebe-header>
		<section class="schCon">
			<div class="content">
				<div class="yjqm">
					<img src="../../assets/img/yjqm.png">
					<a :href="CONFIG.toolsUrl+'/tools/pages/oneTouchName.html'">一键起名</a>
				</div>
				<div class="ysqm">
					<img src="../../assets/img/ysqm2.png">
					<a :href="CONFIG.toolsUrl+'/tools/pages/driveFromName.html'">衍生起名</a>
				</div>
			</div>
		</section>
		<section class="tip">
			好名字是企业发展的第一步! 让拾贝协助您迈出完美的第一步!
		</section>
		<div class="mt-20 topSearch">
			<search-box :keyword="keyword" @render="renderResult" @keywordChange="keywordChange"></search-box>
		</div>
		<section class="tip2">
			衍生起名根据输入的汉字匹配出与此相关的结果<!--{{driveFromNameData.total | getTop10}}-->
		</section>
		<!--<aside class="sideBar"><img src="../../assets/img/aid.jpg"></aside>-->
		<search-result :my-result="driveFromNameData" :loading2="loading2" @render="renderResult"></search-result>
		<sebe-footer></sebe-footer>
	</div>
</template>

<script>
	import Lib from 'assets/Lib';
	import sebeHeader from 'components/Header.vue'
	import searchBox from './component/searchBox.vue'
	import searchResult from './component/searchResult.vue'
	import sebeFooter from 'components/Footer.vue'
	//import {host} form 'assets/config.js'
  import qs from 'qs'

	//组件注册
	export default {
		name: 'app',
		data () {
			return {
				CONFIG: CONFIG,
				loading2: false,
				driveFromNameData:{}, //查询结果data
				keyword: '', //关键字
				//pageSize: 10, //分页数量
				//pageNo: 1, //当前页面
				apiUrl:'./NameRecommendCorl/deriveRecommend.do'
			}
		},
		components: {
			sebeHeader,
			searchBox,
			searchResult,
			sebeFooter
		},
		mounted () {

		},
		methods: {
			keywordChange (data){
				this.keyword = data._keyword;
				//console.log(this.keyword);
			},
			//衍生起名接口请求
			renderResult (data) {
				this.loading2 = true;
				if(!this.keyword || this.keyword == ''){
					this.$message('请输入商标关键字！');
					this.loading2 = false;
					return false;
				}else{
					this.$http.post(this.apiUrl, qs.stringify({
						derive: this.keyword,
						//pageSize: this.pageSize,
						//pageNo: this.pageNo
					}))
					.then((response) => {
						this.loading2 = false;
						//this.driveFromNameData = JSON.parse(response.data);
						this.driveFromNameData = response.data;
					})
					.catch((response) => {
    			 // 这里是处理错误的回调
    			 console.log(response)
    		  });
					console.log(this.driveFromNameData);
				}
			}
		}
	}
</script>

<style>
	#app {
		-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;margin-top: 60px;font-size: 12px;margin: 0 auto;color: #88888d;position:relative;height: 100%;background-color: #fff;
	}
	#app *{box-sizing: content-box;}
	#app header,#app footer,#app header *,#app footer *{box-sizing: border-box;}
	.schCon{width: 980px;margin: 15px auto;text-align: left;padding-top: 60px;text-align: center;font-size: 20px;}
	.content{width: 500px;margin: 0 auto;border-radius: 5px;border: 1px solid #ff7019;height: 45px;line-height: 45px;}
	.yjqm{display:inline-block;width:250px;float:left;}
		.yjqm img{width:10%;vertical-align: middle;}
		.yjqm a{color:#ff7019;text-decoration: none;}
		.yjqm a:hover{text-decoration: none;color: #ff7019;}
	.ysqm{display:inline-block;width:250px;float:left;background-color: #ff7019}
		.ysqm img{width:10%;vertical-align: middle;}
		.ysqm a{color:#fff; text-decoration: none;}
		.ysqm a:hover{text-decoration: none;color: #fff;}
	.tip{padding: 20px;font-size: 16px;text-align: center;}

	a {color: #333;}
	.topSearch{width: 1200px;margin: 15px auto;}
	.tip2{width: 730px;margin: 15px auto;text-align: left;color: #ff7019;}
	.sideBar{width: 210px;height: 500px;position: absolute;right: 340px;top: 120px;}
		.sideBar img{width: 210px;height: 500px;}
		
	.resultFooter *{box-sizing: border-box!important;}
</style>
