<template>
	<div id="app">
		<sebe-header></sebe-header>
		<section class="tradeSerh">
			<img src="../../assets/img/sbdf.png">
			<!--<a href="http://localhost:8081/pages/search.html?keyword=拾贝" style="color:red;">搜索重定向测试</a>-->
		</section>
		<section class="tip">
			名不正则言不顺，取好名字是企业发展的第一步！
		</section>
		<div class="container">
			<div class="mt-20 topSearch">
				<search-box :keyword="keyword" @render="renderResult" @keywordChange="keywordChange"></search-box>
			</div>
			<tm-mark-type :keyword="keyword" :intCls="intCls" @render="renderResult" @tmMarkChange="tmMarkChange"></tm-mark-type>
			<search-result :my-result="scoreData" :intCls="intCls" :isDisable="isDisable" :sa="sa" :loading2="loading2" @render="renderResult"></search-result>
		</div>
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
				loading2: false,
				status:"",
				scoreData:{},
				keyword:"",
				intCls: 0, //商标45大类
				apiUrl:Path + '/tmmark/getGoodTradeName.do',
				isDisable:false,
				sa:true,
				//apiUrl:'/static/score.json'
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
			keywordChange (data){
				this.keyword = data._keyword;
			},
			tmMarkChange(intCls){
				this.intCls = intCls
			},
			//打分接口请求
			renderResult () {
				this.loading2 = true;
				this.isDisable = false;
				this.sa = true;
				if(!this.keyword || this.keyword == ''){
					this.$message('请输入需要打分的商标名称！');
					this.loading2 = false;
					return false;
				}else if(!this.intCls){
					this.$message('请选择商标类别！');
					this.loading2 = false;
					return false;
				}else{
					// 获取查询结果
					this.$http.post(this.apiUrl, qs.stringify({
						tradeMarkName: this.keyword,
						intCls:this.intCls
					}))
					.then((response) => {
						this.loading2 = false;
						this.scoreData = response.data;
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
		color: #2c3e50;margin-top: 60px;font-size: 12px;margin: 0 auto;background-color: #fff;
	}
	#app *{box-sizing: content-box;}
	#app header,#app footer,#app header *,#app footer *{box-sizing: border-box;}
	.container{width: 1200px;margin:0 auto;}
	.tip{text-align: center;}
	.tradeSerh *,.container *{box-sizing: content-box;}
	.tradeSerh li,.container li{display: inline-block;}
	a {color: #333;}
	.tradeSerh {padding: 20px 0px 0px 0px;font-size: 20px;font-weight: 600;color: #5E5E5E;text-align: left;width: 1200px; margin: 80px auto 0px;text-align: center;}
	.tip{padding: 20px;font-size: 20px;}
	.topSearch{width: 1200px; margin:20px auto 20px;}
</style>
