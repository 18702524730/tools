<template>
  <div class="searchWrap">
    <ul class="type">
      <li v-for="item in searchTypeListInline" @click="selectType(item)" :key="item.id" :class="{cur: searchType == item.id}">{{item.name}}</li>
      <!-- @click="selectType(item)" :class="{cur: searchType == item.id}"-->
    </ul>
    <div id="searchForm">
      <span class="searchType" @mouseenter="isShow=true" @mouseleave="isShow=false">{{searchTypeName}}
      <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
      </span>
      <input type="text" placeholder="请输入商标关键字" class="searchIpt" :value="keyword" @input="onInput" @keyup.enter="searchAction"/>
      <span class="search-btn" id="J_search" @click="searchAction">搜  索</span><!--{{intCls}}-->
      <!--<ul class="searchTypeList" v-show="isShow" @mouseenter="isShow=true" @mouseleave="isShow=false">
        <li v-for="item in searchTypeList" @click="selectType(item)" :class="{cur: searchType == item.id}">{{item.name}}</li>
      </ul>-->
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['intCls','searchType','keyword'],
  data () {
    return {
      searchTypeListInline: [
        {
          name: '近似商标',
          id: 4
        },
        {
          name: '精确商标',
          id: 1
        },
        {
          name: '注册号',
          id: 2
        },
        {
          name: '申请人',
          id: 3
        },
      ],
      /*searchTypeList: [
        {
          name: '商标名称',
          id: 1
        },
        {
          name: '注册号',
          id: 2
        },
        {
          name: '申请人',
          id: 3
        }
      ],*/
      searchTypeName: '商标名称',
      //searchType: 4,
      isShow: false,
      value: '',
      sc:'1,2,3,4,5,6,7,8,9,10',
      st:"1",
      rtnMoreProperty:true,
      kwd:''
      //keyword:'',
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
            return  unescape(decodeURIComponent(c[2]));
          }else{
            return null;
          }
        }else{
          return null;
        }
    },
    // 输入框v-model绑定
    onInput (event){
      this.$emit('input', event.target.value);
      this.value = event.target.value;
      //console.log(':',this.value);
      var ret = {}
      ret._keyword = this.value;
      this.$emit('keywordChange', ret)
    },
    selectType (item){
      var ret = {};
      var _searchType = item.id;
      //this.searchTypeName = item.name;
      //console.log(item);
      if(item.id == 4 || item.id == 1){
        this.searchTypeName = "商标名称";
      }else if(item.id == 2){
        this.searchTypeName = "注册号";
      }else if(item.id == 3){
        this.searchTypeName = "申请人";
      }
      this.isShow = false;
      ret._searchType = _searchType;
      this.$emit('schTypeChg', ret);
    },
    // 点击查询按钮事件
    searchAction(){

      //alert(this.keyword);
      var ret = {}
      /*var kwd = this.getUrlPara('keyword');
      if(kwd && kwd != null){
        ret._keyword = kwd;
        ret._intCls = this.allIntCls;
      }else{*/
        ret._keyword = this.value || this.keyword;
        ret._intCls = this.intCls;
      //}
      ret._searchType = this.searchType;
      ret._sc = this.sc;
      ret._st = this.st;
      ret._rtnMoreProperty = this.rtnMoreProperty;
      ret.isReset = true;
      //console.log(ret);
      this.$emit('render', ret)
    },
  },
  mounted () {
    //alert(this.intCls);
    var kwd = this.getUrlPara('keyword');
    this.value = this.keyword;
    console.log(kwd,this.value)
    /*if(kwd && kwd != null){
      //alert(this.searchType);
      this.searchAction();
    }*/
  }
}
</script>



<style scoped>
.searchWrap{width:700px;}
.searchWrap *{box-sizing: content-box;}
.type{float: left;}
.type li.cur{background-color: #3db1fa;color: #fff;}
.type li{display: inline-block;padding:10px;margin:0;color: #3db1fa;cursor: pointer;}
/*.type li:first-child{border-right: 1px solid #ccc}*/
#searchForm{position: relative;width:680px;border: 2px solid #3db1fa;margin:0;height: 34px;line-height: 34px;clear: both;}
.searchType{float: left;width:60px;background: #f5f5f5; height: 34px;text-align:left;padding-left: 10px;cursor: pointer;}
.searchType .fa{color: #999;margin-left: 10px;}
.searchIpt{float: left;width:520px;border:0 none; height: 34px;margin:0;padding: 0;padding-left: 10px;}
.search-btn{float: left;width: 80px;text-align:center;height: 34px;background: #3db1fa;color:#fff;cursor: pointer;}
.searchTypeList{position: absolute;top: 34px;left: -2px;width: 100px;background-color: #fff;border:2px solid #3db1fa;border-top:0 }
.searchTypeList li{text-align:left;display: block;height: 34px;line-height: 34px;padding-left: 20px}
.searchTypeList li:hover{background-color: #ccc;color: #fff; cursor: pointer;}
.searchTypeList li.cur{background-color: #eee; cursor: pointer;}
.searchTypeList li.cur:hover{color: #333}
</style>
