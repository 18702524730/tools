<template>
  <ul class="classification">
    <li :class="{item: true, wrap: !more}">
      <div class="label">商标分类：</div>
      <ul class="classify pdLeft60" v-loading="loading2">
        <li v-for="(item, index) in typeResult" :class="{true: 'modalActive', false: 'modalInactive'}[item.Checked]"  @click="checkClassItem(item,index),confirmIndexs(item,index)" >
          <a :class="{true: 'aActive'}[item.Checked]">第{{item.id < 10 ? '0'+ item.id : item.id}}类 【{{item.goodsname}}】</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['keyword','intCls'],
  data() {
    return {
      result:[],
      loading2: true,
      more: true,
      typeResult: [],//商标45大类
      isAll: -1,
      type:[],
      checkedIndexs:"",
      postData:{},
      arr:[],
      chkArr:[]
    }
  },
  mounted () {
    // 获取商标分类45大类
    this.$http.post('./rabbit/findAllIndustryWord.do').then((response) => {
      this.loading2 = false;
      var r = response.data;
      // 这里是处理正确的回调
      if (r && r.code === '0'){
        this.result = r.list || [];
        this.typeResult = this.result.map(function(item){
          return {"id":item.id,"goodsname":item.goodsname,"Checked":false,"Temp":false}
        });
      }
    }).catch((response) => {
      // 这里是处理错误的回调
      console.log(response)
    });
  },
  methods: {
    //45大类初始化
    checkClassItem(item,$index){
      //单选
      if(this.arr.length==0){
        this.arr.push($index);
        item.Checked = true;
      }else if(this.arr.length > 0){
        var lastIndex = this.arr[0];
        this.typeResult[lastIndex].Checked = false;
        this.arr.length = 0;
        this.arr.push($index);
        item.Checked = true;
      }
    },
    confirmIndexs(item,$index){
      var result = "";
      result = item.id;
      this.$emit('tmMarkChange', result);
    },
  }
}
</script>

<style scoped>
.classification{text-align: left;border: 1px solid #eaeaea;}
.classification .item{transition: height 250ms; height:274px;overflow: hidden;position: relative;width:100%;background-color: #f1f1f1;margin: 0;padding:0;border-top:1px solid #eaeaea;cursor:pointer; display: block;}
.classification .wrap{height: 268px; }
.classification .item:first-child{border-top: 0;}
.classification .item .label{float: left;width:68px;display: block;padding: 10px 0 4px 12px;background-color: #f1f1f1;line-height: 28px;}
.classification .item .more{position: absolute;bottom: 9px;right: 5px; color: #999}
.classify{position: relative;min-height:64px;overflow: hidden;padding: 10px 0 10px 80px;text-align: left;margin-left: 80px;background-color: #fff;}
.classify li:first-child{width: 40px;position: absolute;top: 10px;left: 10px;}
.classify li{float: left;width:126px;height: 24px;line-height: 24px;text-align: center;border: 1px solid #fff;padding-left: 10px;margin:0 15px;margin-bottom:6px;text-align: left}
.classify li.cur{border: 1px solid #ff7019;color: #ff7019;}
.classify li:hover{color: #3db1fa;}
.classify li.cur a,.classify li:hover a{/*color:#3db1fa;*/text-decoration: none;}
.modalActive{border: 1px solid #ff7019;color: white;background-color: #ff7019;}
.modalInactive{border:none;}
.aActive{color: white;}
.cancel{position: absolute;top: 50px;left: 10px;}
.hide{display: none;}
.pdLeft60{padding-left: 60px;}
</style>