<template>
  <ul class="classification">
    <li class="item">
      <div class="label">选择所属行业：</div>
      <ul class="classify">
        <!--<li @click="tmMarkAction('-1')" :class="{cur: isCur == -1}"><a >全部</a></li>
        <li @click="tmMarkAction(index)" :class="{cur: isCur == index}" v-for="(item, index) in typeResult">
          <a :href="'#'+item.id">第{{item.id}}类 【{{item.goodsname}}】</a>
        </li>-->
        <li v-for="(item, index) in typeResult" :class="{true: 'modalActive', false: 'modalInactive'}[item.Checked]" :key="index" @click="checkClassItem(item, index)" >
          <span style="font-size: 12px;">第{{item.id}}类 【{{item.goodsname}}】</span>
        </li>
      </ul>
    </li>
    <section class="oneKey" @click="oneKeyTouch();">一键生成</section>
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
import qs from 'qs'
export default {
  props: ['keyword'],
  data() {
    return {
      result:[],
      typeResult: [],//商标45大类
      type:0,
      checkedIndexs:"",
      postData:{}
    }
  },
  mounted () {
    // 获取商标分类45大类
    this.$http.post('./rabbit/findAllIndustryWord.do')
    .then((response) => {
        //var r = JSON.parse(response.data);
        var r = response.data;
        this.result = r.list;
        this.typeResult = this.result.map(function(item){
          return {"id":item.id,"goodsname":item.goodsname,"Checked":false}
        });
        //console.log(this.typeResult);
        //console.log(JSON.parse(response.data).list);
    })
    .catch(err => {
      console.log(err);
    });
  },
  methods: {
    //45大类初始化
    checkClassItem(item,$index){
      item.Checked = !item.Checked;
      
    },
    confirmIndexs(){
      var result = "";
      result += this.typeResult.filter(function (item) {
        return item.Checked;
      }).map(function (item) {
        return item.id;
      });
      return result;
    },
    //一键生成
    oneKeyTouch() {
      this.checkedIndexs = this.confirmIndexs();
      //console.log(this.checkedIndexs);
      this.postData.intCls = this.checkedIndexs;
      // sessionStorage.setItem('checkedTypeId',this.checkedIndexs)
      this.$emit('render',this.postData);
    },

    /*tmMarkAction (idx){
      this.isCur = idx;
      this.type = idx-0+1;
      var ret = {};
      ret._intCls = this.type;
      this.$emit('render', ret);
    }*/
  }
}
</script>

<style scoped>
.classification{text-align: left;width: 1170px;margin: 0px auto;}
.classification .item{width:100%;background-color: #f1f1f1;margin: 0;padding:0;border-top:1px solid #eaeaea;cursor:pointer; border: 1px solid #eaeaea;display: inline-block;}
.classification .item .label{float: left;width:95px;display: block;padding: 4px 0 4px 12px;background-color: #f1f1f1;line-height: 34px;}
.classify{position: relative;padding: 10px 0 10px 0px;text-align: left;margin-left: 110px;background-color: #fff;}
/*.classify li:first-child{width: 40px;position: absolute;top: 10px;left: 10px;}*/
.classify li{width:132px;display: inline-block;height: 26px;line-height: 26px;text-align: center;padding-left: 10px;margin:2px 15px;text-align: left}/*border: 1px solid #fff;*/
.modalActive{border: 1px solid #ff7019;color: white;background-color: #ff7019;}
.modalInactive{border:none;}
/*.classify li.cur,.classify li:hover{border: 1px solid #3db1fa;color: #3db1fa;}
.classify li.cur a,.classify li:hover a{color:#3db1fa;text-decoration: none;}*/
.oneKey{cursor:pointer;background-color: #3db1fa;width: 10%;margin: 20px auto;padding: 5px 60px;border-radius: 5px;color: white;font-size: 20px;text-align: center;}
</style>