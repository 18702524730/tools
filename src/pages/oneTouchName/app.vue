<template>
	<div id="app">
		<sebe-header></sebe-header>
		<section class="schCon">
			<div class="content">
				<div class="yjqm">
					<img src="../../assets/img/yjqm2.png">
					<a :href="CONFIG.toolsUrl+'/tools/pages/oneTouchName.html'">一键起名</a>
				</div>
				<div class="ysqm">
					<img src="../../assets/img/ysqm.png">
					<a :href="CONFIG.toolsUrl+'/tools/pages/driveFromName.html'">衍生起名</a>
				</div>
			</div>
		</section>
		<section class="tip">
			好名字是企业发展的第一步! 让拾贝协助您迈出完美的第一步!
		</section>
		<tm-mark-type :keyword="keyword" @render="renderResult"></tm-mark-type>
		<!--<aside class="sideBar"><img src="../../assets/img/aid.jpg"></aside>-->
		<search-result :my-result="oneTouchNameData" :loading2="loading2" @render="renderResult"></search-result>
		<sebe-footer></sebe-footer>
	</div>
</template>

<script>
	//组件引入
  import Lib from 'assets/Lib';
	import sebeHeader from 'components/Header.vue'
	import searchBox from './component/searchBox.vue'
	import tmMarkType from './component/tmMarkType.vue'
	import searchResult from './component/searchResult.vue'
	import sebeFooter from 'components/Footer.vue'
	import qs from 'qs'

	//组件注册
	export default {
		name: 'app',
		data () {
			return {
        keyword: '',
				CONFIG:CONFIG,
				loading2: false,
				oneTouchNameData:{}, //查询结果data
				intCls: 0, //商标45大类
				//pageSize: 10, //分页数量
				//pageNo: 1, //当前页面
				apiUrl:'./NameRecommendCorl/oneRecommend.do'
				//apiUrl:'/static/name.json'
			}
		},
		components: {
			sebeHeader,
			searchBox,
			tmMarkType,
			searchResult,
			sebeFooter
		},

		mounted () {
		},
		methods: {
			//一键起名接口请求
			renderResult (postData) {
				//alert(postData.intCls);
				this.loading2 = true;
				this.intCls = postData.intCls === undefined ? this.intCls : postData.intCls;
				if(!this.intCls){
					this.$message.error('请选择所属行业！');
					this.loading2 = false;
					return false;
				}else{
					// 获取查询结果
					this.$http.post(this.apiUrl, qs.stringify({
						intCls: this.intCls
					}))
          .then((response) => {
						this.loading2 = false;
						//this.oneTouchNameData = JSON.parse(response.data);
						this.oneTouchNameData = response.data;
						//console.log(JSON.parse(response.data));
						console.log(this.oneTouchNameData)
					}).catch((response) => {
            // 这里是处理错误的回调
            console.log(response)
          });
				}
			}
		}
	}
</script>

<style>
	#app {
		-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;margin-top: 60px;font-size: 12px;margin: 0 auto;color: #88888d;position: relative;height: 100%;background-color: #fff;
	}
	#app *{box-sizing: content-box;}
	#app header,#app footer,#app header *,#app footer *{box-sizing: border-box;}
	.schCon{width: 980px;margin: 15px auto;text-align: left;padding-top: 60px;text-align: center;font-size: 20px;}
	.content{width: 500px;margin: 0 auto;border-radius: 5px;border: 1px solid #ff7019;height: 45px;line-height: 45px;}
	.yjqm{display:inline-block;width:250px;float:left;background-color: #ff7019}
		.yjqm img{width:10%;vertical-align: middle;}
		.yjqm a{color:#fff;text-decoration: none;}
    .yjqm a:hover{text-decoration: none;color: #fff;}
	.ysqm{display:inline-block;width:250px;float:left;}
		.ysqm img{width:10%;vertical-align: middle;}
		.ysqm a{color:#ff7019; text-decoration: none;}
    .ysqm a:hover{text-decoration: none;color: #ff7019;}
	.tip{padding: 20px;font-size: 16px;text-align: center;}

	a {color: #333;}
	.sideBar{width: 210px;height: 500px;position: absolute;right: 220px;top: 120px;}
		.sideBar img{width: 210px;height: 500px;}

	.resultFooter *{box-sizing: border-box!important;}
</style>
