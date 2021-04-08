<template>
  <ul class="classification">
    <li :class="{item: true, wrap: !more}">
      <div class="label">商标分类：</div>
      <ul class="classify" v-loading="loading2" :class="{'pdLeft60': searchType==4}">
        <!--<li @click="chkAll(-1),confirmIndexs(-1)" :class="{cur: isAll == -1}"><a>全部</a></li>-->
        <li @click="checkClassItem(-1),confirmIndexs(-1)" :class="{cur: isAll == -1,'hide': searchType==4}"><a>全选</a></li>
        <li style="width:40px;" @click="cancelClassItem(),confirmIndexs(-1)" class="cancel" :class="{cur: isAll == -1,'hide': searchType==4}"><a>取消</a></li>
        <!--<li @click="tmMarkAction('-1')" :class="{cur: isAll == -1}"><a >全部</a></li>
        <li @click="tmMarkAction(index, item)" :class="{cur: item.selected}" v-for="(item, index) in typeResult">
          <a>第{{item.id < 10 ? '0'+ item.id : item.id}}类 【{{item.goodsname}}】</a>
        </li>-->
        <li v-for="(item, index) in typeResult" :class="{true: 'modalActive', false: 'modalInactive'}[item.Checked]"  @click="checkClassItem(item,index),confirmIndexs(item,index)" >
          <a :class="{true: 'aActive'}[item.Checked]">第{{item.id < 10 ? '0'+ item.id : item.id}}类 【{{item.goodsname}}】</a>
        </li>
      </ul>
      <!--<div class="more" @click="more = !more">
        <span v-if="more">更多 <i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
        <span v-else>收缩 <i class="fa fa-angle-double-up" aria-hidden="true"></i></span>
      </div>-->
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
  props: ['keyword','searchType','intCls'],
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
    this.$http.post(Path + '/rabbit/findAllIndustryWord.do', {})
    .then((response) => {
      this.loading2 = false;
      var r = response.data;
      // 这里是处理正确的回调
      if (r && r.code === '0'){
        //this.typeResult = r.list || [];
        this.result = r.list || [];
        if(this.keyword && this.keyword != null){
          this.typeResult = this.result.map(function(item){
            return {"id":item.id,"goodsname":item.goodsname,"Checked":true,"Temp":false}
          });
          this.confirmIndexs(-1);
        }else{
          this.typeResult = this.result.map(function(item){
            return {"id":item.id,"goodsname":item.goodsname,"Checked":false,"Temp":false}
          });
        }

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
    //45大类初始化
    checkClassItem(item,$index){
      //alert(this.intCls);
      //alert(this.searchType);
      if(item == -1){
        if(this.searchType==4){
          this.$message('近似查询只能选择单个商标分类！');
        }else if(this.searchType!=4){
          //this.$message('模糊查询全选');
          this.typeResult.map(function (item) {
            if(!item.Checked) {
              item.Checked = true;
            };
            //item.Checked = !item.Checked;
          });
        }
      }else if(item != -1){
        if(this.searchType==4){
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
        }else{
          //多选
          item.Checked = !item.Checked;
          item.Temp = !item.Temp;
          if(item.Checked == true){
            this.chkArr.push($index);
          };
        }
      }

    },
    //没有点选默认选取最后项bug
    cancelClassItem(){
      this.typeResult.map(function (item) {
        if(item.Checked) {
          item.Checked = false;
        };
        //item.Checked = !item.Checked;
      });
      /*
      var result = "";
      result += this.typeResult.filter(function (item) {
        return item.Checked;
      }).map(function (item) {
        return item.id;
      });
      console.log("result:");
      console.log(result);

      this.$emit('tmMarkChange', result,this.typeResult);
      */
    },
    /*checkClassItem(item,$index){
      //alert(this.intCls);
      //alert(this.searchType);
      if(this.searchType==4){
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
      }else{
        //多选
        item.Checked = !item.Checked;
        item.Temp = !item.Temp;
        if(item.Checked == true){
          this.chkArr.push($index);
        };
      }
    },*/
    chkAll(idx){
      if(this.searchType==4){
        this.$message('近似查询只能选择单个商标分类！');
        for(var i=0; i < this.typeResult.length; i++){
          this.typeResult[i].Checked = false;
        }
      }else{

        this.typeResult.map(function (item) {
          if (!item.Checked) {
            item.Temp = true;
            item.Checked = true;
          };

          //item.Checked = !item.Checked;

          //item.Checked = !item.Checked;
          /*if(item.Checked){
            //item.Temp = !item.Temp;
            item.Checked = false;
          }*/
          //return item;
        });

        /*for (var i = 0 ; i < this.typeResult.length ; i++ ){
          console.log(this.typeResult[i].Checked);
          //this.typeResult[i].Checked = false;
          //console.log(this.typeResult[i].Checked);
        };*/


        //清理已选项
        var chkItm = [];
        for(var i = 0; i < this.chkArr.length; i++){
          chkItm.push(this.chkArr[i]);
        };
        //console.log(chkItm);
        var allItm = this.typeResult.map(function(item){
          return item.id - 1;
        });
        //console.log(allItm);
        if(chkItm.length > 0){
          /*for(var j = 0; j < chkItm.length; j++){
              this.typeResult[chkItm[j]].Checked = !this.typeResult[chkItm[j]].Checked;
          };*/
          var leftItm = this.mergeArray(allItm,chkItm);
          //console.log(leftItm);

          //如果存在已选项，this.typeResult先将已选项Checked改为false
          /*for(var j = 0; j < chkItm.length; j++){
            this.typeResult[chkItm[j]].Checked = !this.typeResult[chkItm[j]].Checked;
          };*/
          //console.log(chkItm);
          //console.log(this.typeResult);
          /*for (var i = 0 ; i < this.typeResult.length ; i++ ){
            for(var j = 0 ; j < chkItm.length ; j++ ){
              //if (this.typeResult[i].id == chkItm[j]){
                this.typeResult[chkItm[j]].Checked = !this.typeResult[chkItm[j]].Checked;
                this.typeResult[i].Checked = !this.typeResult[i].Checked;
                //console.log(this.typeResult[i].id);
                //this.typeResult[i].Checked = !this.typeResult[i].Checked;
              //}
            }

          };*/


          //console.log(this.typeResult);
        };
          /*this.typeResult = this.typeResult.map(function(item){
            return {"id":item.id,"goodsname":item.goodsname,"Checked":false}
          });*/
          //console.log(this.typeResult)

        /*for(var i=0; i < this.typeResult.length; i++){
          this.typeResult[i].Checked = !this.typeResult[i].Checked;
        };*/

        /*for(var j=0; j < this.chkArr.length; j++){
          this.chkArr[j].Checked = !this.chkArr[j].Checked;
        };*/

        /*for(var i=0; i < this.typeResult.length; i++){
          if(chkItm.length > 0){
            /*for(var j = 0; j < chkItm.length; j++){
              this.typeResult[chkItm[j]].Checked = !this.typeResult[chkItm[j]].Checked;
            };*./
            this.typeResult[i].Checked = !this.typeResult[i].Checked;
          }else{
            this.typeResult[i].Checked = !this.typeResult[i].Checked;
          };
        }*/
      }
    },
    //获取剩余项
    mergeArray(arr1, arr2){
      for (var i = 0 ; i < arr1.length ; i ++ ){
        for(var j = 0 ; j < arr2.length ; j ++ ){
          if (arr1[i] === arr2[j]){
            arr1.splice(i,1);
          }
        }
      }
      //alert(arr1);
      return arr1;
    },
    //没有点选默认选取最后项bug
    confirmIndexs(item,$index){
      //alert(item + " " + $index);
      //alert(this.intCls);
      var result = "";
      if(item == -1){
        if(this.searchType==4){
          this.$message('近似查询只能选择单个商标分类！');
        }else if(this.searchType!=4){
          result += this.typeResult.filter(function (item) {
            return item.Checked;
          }).map(function (item) {
            return item.id < 10 ? '0'+item.id : item.id+'';
          });
          //console.log(result);
        }
      }else if(item != -1){
        if(this.searchType==4){
          result = item.id < 10 ? '0'+item.id : item.id+'';
          //单选,切换近似查询清理已选项
          for(var i=0; i < this.typeResult.length; i++){
            this.typeResult[i].Checked = false;
          }
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
        }else{
          //没有点选默认选取最后项bug
          result += this.typeResult.filter(function (item) {
            return item.Checked;
          }).map(function (item) {
            return item.id < 10 ? '0'+item.id : item.id+'';
          });
        }
      }
      //console.log("result:");
      //console.log(result);
      var ret = {};
      ret._keyword = this.value || this.keyword;
      ret._intCls = result;
      ret._typeResult = this.typeResult;
      this.$emit('tmMarkChange', result,this.typeResult);
      //this.$emit('render', ret)
    },
    /*confirmIndexs(item,$index){
      //alert(this.intCls);
      var result = "";
      if(this.searchType==4){
        result = item.id;
        //单选,切换近似查询清理已选项
        for(var i=0; i < this.typeResult.length; i++){
          this.typeResult[i].Checked = false;
        }
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
      }else{
        result += this.typeResult.filter(function (item) {
          return item.Checked;
        }).map(function (item) {
          return item.id;
        });
      };
      //console.log(result);
      this.$emit('tmMarkChange', result,this.typeResult);
    }*/

  }
}
</script>

<style scoped>
.classification *{box-sizing: content-box;}
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
