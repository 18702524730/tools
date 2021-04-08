<template>
  <div class="searchWrap">
      <!-- <ul class="type">
        <li class="cur">精确查询</li>
        <li>近似查询</li>
      </ul> -->
      <div id="searchForm">
        <input type="text" placeholder="请输入商标关键字" class="searchIpt" :value="keyword" @input="onInput" @keyup.enter="searchAction"/>
        <span class="search-btn" id="J_search" @click="searchAction">搜名字</span>
      </div>
    </div>
</template>

<script type="text/javascript">
function getQueryString(name) {
  var ret = '';
  console.log(location.search.slice(1));
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.slice(1).match(reg);
  if (r != null) {
    ret = unescape(r[2]);
  }
  console.log(ret);
  return ret;
}

export default {
  props: ['keyword'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 输入框v-model绑定
    onInput (event){
      this.$emit('input', event.target.value);
      this.value = event.target.value;
      var ret = {}
      ret._keyword = this.value;
      this.$emit('keywordChange', ret)
    },
    // 点击查询按钮事件
    searchAction (){
      var ret = {}
      ret._keyword = this.value;
      this.$emit('render', ret)
    }
  },
  mounted () {
    // 初始化
    this.value = this.keyword;
    //this.searchAction();
  }
}
</script>



<style scoped>
.searchWrap{width:1200px;overflow: hidden;}
.type{float: left;margin-bottom: 10px;}
.type li.cur{color: #3db1fa;}
.type li{padding: 0 10px;margin:0;}
.type li:first-child{border-right: 1px solid #ccc}
#searchForm{width:730px;border: 2px solid #d2d2d2;margin:0 auto;height: 45px;line-height: 34px;clear: both;border-radius: 3px;}
.searchType{float: left;width:100px;background: #f5f5f5; height: 34px}
.searchIpt{float: left;width:640px;border:0 none; height: 45px;margin:0;padding: 0;padding-left: 10px;}
.search-btn{float: left;width: 80px;text-align:center;height: 45px;line-height: 45px;background: #3db1fa;color:#fff;cursor: pointer;}
</style>