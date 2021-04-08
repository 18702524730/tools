<template>
  <div id="app">
    <sebe-header :name="userName"></sebe-header>
    <div class="container__">
      <div class="topSearch">
        <search-box :keyword="keyword" :searchType="searchType" :intCls="intCls" @render="renderResult" @keywordChange="keywordChange" @schTypeChg="typeChg"></search-box>
      </div>
      <tm-mark-type :keyword="keyword" :searchType="searchType" :intCls="intCls" @render="renderResult" @tmMarkChange="tmMarkChange"></tm-mark-type>
      <search-result :checkAll="checkAll" :keyword="keyword" :totalPages="totalPages" :searchType="searchType" :my-result="resultData" :pageSize="pageSize" :intCls="intCls" :checkedItems="checkedItems" :loading2="loading2" :typeResult="typeResult" @render="renderResult" @batExport="batExportAction"></search-result>
    </div>
    <!-- <customer-service :cartNum="cartNum"></customer-service> -->
    <sebe-footer></sebe-footer>
  </div>
</template>

<script>
  import Lib from 'assets/Lib';
  import sebeHeader from 'components/Header.vue'
  import searchBox from './component/searchBox.vue'
  import tmMarkType from './component/tmMarkType.vue'
  import searchResult from './component/searchResult.vue'
  import sebeFooter from 'components/Footer.vue'
  import customerService from 'components/CustomerService.vue'
  import qs from 'qs'
  export default {
    name: 'app',
    data () {
      return {
        cartNum:"",
        userName: "",
        loading2: false,
        resultData: '', //查询结果data
        keyword: '', //关键字
        kwd:'',
        intCls: 0, //商标45大类
        allIntCls:'01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45',
        pageSize: 20, //分页数量
        totalPages:1,//总页数
        pageNo: 1, //当前页面
        searchType: 1, //1: 商标名， 2：注册号， 3：申请人 商标名/注册号/申请人只要模糊匹配 4:近似查询
        apiUrl:"",
        typeResult:"",
        type:"1", //业务类型
        source:"1", //数据来源
        checkedItems:[],
        checkAll:false//全选
      }
    },
    components: {
      sebeHeader,
      searchBox,
      tmMarkType,
      searchResult,
      customerService,
      sebeFooter
    },
    mounted() {
      this.keyword = this.getUrlPara('keyword');
      /*if(this.keyword && this.keyword != null){
        this.searchType = 1;
      }*/
      //this.renderResult({});
      var userName = this.$cookie.get('truename');
      var phone = this.$cookie.get('phone');
      if (phone) {
        phone = phone.slice(0, 3) + '****' + phone.slice(-4);
      }
      this.userName = userName ? userName : phone;
      this.cartNum = this.$cookie.get('cart_num') || '0';

      if(this.keyword && this.keyword != null){
        var ret = {}
        ret._keyword = this.keyword;
        ret._intCls = this.allIntCls;
        ret._searchType = this.searchType;
        this.renderResult(ret);
      }
    },
    methods: {
      //截取搜索字符串
      getUrlPara(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.href;
        var b = r.split("?");
        //console.log(b);
        if(b!=null&&b.length>1){
          var c = b[1].match(reg);
          //console.log(c);
          if(null!=c){
            return  unescape(decodeURIComponent(c[2].replace('#/','')));
          }else{
            return null;
          }
        }else{
          return null;
        }
      },

      batExportAction (d){
        var ret = {
          keyword: this.keyword,
          pageSize: d._pageSize || this.pageSize,
          pageNo: this.pageNo,
          searchType: this.searchType,
          intCls: this.intCls,
          sc:'1,2,3,4,5,6,7,8,9,10',
          //st:"1",
          rtnMoreProperty:true
        }
        var arr = [];
        _.each(ret, function(item, idx, list){
          arr.push(idx + '=' + item);
        })
        window.location = Path + '/rabbit/reportList.do?'+ arr.join('&');
      },
      keywordChange (data){
        this.keyword = data._keyword;
      },
      //近似查询||关键字，申请人，注册号查询
      typeChg(data){
        //console.log("searchType:");
        //console.log(data);

        this.searchType = data._searchType || this.searchType;

        //切换近似查询清理已选项
        if(this.searchType == 4){
          for(var i=0; i < this.typeResult.length; i++){
            this.typeResult[i].Checked = false;
            this.intCls = '0';
          }
        }

      },
      tmMarkChange(intCls,typeResult){
        this.intCls = intCls //|| this.intCls;//没有点选默认选取最后项bug修复
        //console.log("intCls:");
        //console.log(this.intCls);
        this.typeResult = typeResult;
        //console.log("typeResult:");
        //console.log(this.typeResult);
      },
      // 统一查询数据入口
      renderResult (data) {
        //alert(this.intCls);
        //console.log("data:");
        //console.log(data);
        this.checkedItems.length = 0;
        this.loading2 = true;
        this.keyword = data._keyword === undefined ? this.keyword : data._keyword;
        //console.log(!this.keyword)
        if(!this.keyword){
          this.$message('请输入商标关键字！');
          this.loading2 = false;
          return false;
        }
        this.pageSize = data._pageSize || this.pageSize;
        this.pageNo = data._pageNo || this.pageNo;
        this.searchType = data._searchType || this.searchType;
        this.intCls = data._intCls === undefined ? this.intCls : data._intCls;

        //没有点选默认选取最后项bug
        //console.log(this.intCls);

        this.sc = data._sc || this.sc;
        this.st = data._st || this.st;
        this.rtnMoreProperty = data._rtnMoreProperty || this.rtnMoreProperty;

        var ret = {};
        if(this.searchType == 4){
          this.apiUrl = "./rabbit/approximatetwo.do";
          ret = {
            keyword: this.keyword,
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            searchType: this.searchType,
            intCls: this.intCls,
            sc:this.sc,
            //st:this.st,
            rtnMoreProperty:this.rtnMoreProperty,
            type:this.type,
            source:this.source
          }
        }else{
          this.apiUrl = "./rabbit/findTrademarkByCondition.do";
          ret = {
            keyword: this.keyword,
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            searchType: this.searchType,
            intCls: this.intCls,
            type:this.type,
            source:this.source
          }
        }

        if (data.isReset) {
          ret.pageNo = 1
        }

        if (data.isSelectType) {
          this.loading2 = false;
          return;
        }

        if(this.intCls==0){
          this.$message('请选择商标分类！');
          this.loading2 = false;
          return false;
        }else{
          // 获取查询结果
          this.$http.post(this.apiUrl, qs.stringify(ret))
          .then((response) => {
            //console.log(JSON.parse(response.data));
            // 这里是处理正确的回调
            this.loading2 = false;
            var data = response.data;
            this.resultData = data;
            this.totalPages = Math.ceil(this.resultData.total/this.resultData.pageSize);
            //console.log("totalPages:");
            //console.log(this.totalPages);
            //console.log("resultData:");
            //console.log(this.resultData);
            this.checkAll = false;

          })
          .catch((response) => {
            // 这里是处理错误的回调
            console.log(response)
          });
        };


      }
    }
  }

  //获取url中的查询关键字
  function getQueryString(name) {
    var ret = '';
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = location.search.slice(1).match(reg);
    if (r != null) {
      ret = decodeURIComponent(r[2]);
    }
    return ret;
  }
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  background-color: #fff;
  color: #2c3e50;
  font-size: 12px;
}
#app .container__ *{box-sizing: content-box;}
#app .sider_bar .item, #app .sider_bar .title{text-align: center;}
a {
  color: #333;
}
.container__{padding-top:20px;width: 1200px;margin:0 auto;text-align: center;}
.topSearch{position: relative;z-index:2;width: 700px; margin:0 auto;padding: 30px 0;}
.el-loading-spinner .circular{width: 30px;}
/*按钮*/
.el-button--primary {
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
}
.search_content .s_btn{padding: 0}
</style>
