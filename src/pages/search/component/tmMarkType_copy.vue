<template>
  <ul class="classification">
    <li :class="{item: true, wrap: !more}">
      <div class="label">商标分类：</div>
      <ul class="classify" v-loading="loading2">
        <li @click="tmMarkAction('-1')" :class="{cur: isAll == -1}"><a >全部</a></li>
        <li @click="tmMarkAction(index, item)" :class="{cur: item.selected}" v-for="(item, index) in typeResult">
          <a>第{{item.id < 10 ? '0'+ item.id : item.id}}类 【{{item.goodsname}}】</a>
        </li>
      </ul>
      <div class="more" @click="more = !more">
        <span v-if="more">更多 <i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
        <span v-else>收缩 <i class="fa fa-angle-double-up" aria-hidden="true"></i></span>
      </div>
    </li>
    <!-- <li class="item">
      <div class="label">法律状态：</div>
      <ul class="classify">
        <li class="cur"><a href="">全部</a></li>
        <li><a href="">待审中</a></li>
        <li><a href="">已注册</a></li>
        <li><a href="">续展期</a></li>
        <li><a href="">无效</a></li>
      </ul>
    </li> -->
  </ul>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['keyword'],
  data() {
    return {
      loading2: true,
      more: true,
      typeResult: [],
      isAll: -1,
      type:[]
    }
  },
  mounted () {
    // 获取商标分类45大类
    this.$http.post('./rabbit/findAllIndustryWord.do', {})
    .then((response) => {
      this.loading2 = false;
      var r = response.data;
      // 这里是处理正确的回调
      if (r && r.code === '0'){
        this.typeResult = r.list || [];
        //console.log("typeResult:");
        //console.log(this.typeResult);
      }
    })
    .catch((response) => {
      // 这里是处理错误的回调
      console.log(response)
    });
  },
  methods: {
    tmMarkAction (idx, item){
      var delArrOne = function(arr, value){
        for (var i = arr.length - 1; i >= 0; i--) {
          if(arr[i] == value){
            arr.splice(i, 1);
          }
        }
      }

      var setAll  = function(arr, name, val){
        for (var i = arr.length - 1; i >= 0; i--) {
          Vue.set(arr[i], name, val);
        }
      }

      if (idx == -1) {
        this.type = [];
        this.isAll = -1;
        setAll(this.typeResult, 'selected', false);
      } else {
        this.isAll = 0;
        var id = idx-0+1;
        if(this.type.indexOf(id) !== -1){
          Vue.set(item, 'selected', false);
          delArrOne(this.type, id);
        }else{
          Vue.set(item, 'selected', true);
          this.type.push(id);
        }
      }

      var ret = {};
      ret._intCls = idx == -1 ? '0' : this.type.join();
      //console.log(ret._intCls)
      ret.isSelectType = true;
      this.$emit('render', ret);
    }
  }
}
</script>

<style scoped>
.classification{text-align: left;border: 1px solid #eaeaea;}
.classification .item{transition: height 250ms; height:74px;overflow: hidden;position: relative;width:100%;background-color: #f1f1f1;margin: 0;padding:0;border-top:1px solid #eaeaea;cursor:pointer; display: block;}
.classification .wrap{height: 268px; }
.classification .item:first-child{border-top: 0;}
.classification .item .label{float: left;width:68px;display: block;padding: 10px 0 4px 12px;background-color: #f1f1f1;line-height: 28px;}
.classification .item .more{position: absolute;bottom: 9px;right: 5px; color: #999}
.classify{position: relative;min-height:64px;overflow: hidden;padding: 10px 0 10px 80px;text-align: left;margin-left: 80px;background-color: #fff;}
.classify li:first-child{width: 40px;position: absolute;top: 10px;left: 10px;}
.classify li{float: left;width:126px;height: 24px;line-height: 24px;text-align: center;border: 1px solid #fff;padding-left: 10px;margin:0 15px;margin-bottom:6px;text-align: left}
.classify li.cur{border: 1px solid #3db1fa;color: #3db1fa;}
.classify li:hover{color: #3db1fa;}
.classify li.cur a,.classify li:hover a{color:#3db1fa;text-decoration: none;}
</style>
