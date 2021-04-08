<template>
  <div class="searchDetail" v-loading="loading" element-loading-text="拼命加载中">
    <!--{{checkedItems}}-->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="content"><!-- v-if="post"-->
      <table width="100%" class="searchDetailtb">
        <tbody>
          <tr>
            <td colspan="2" class="tl til">查询人：</td>
            <td colspan="2" class="til">{{selectPeople}}</td>
            <td colspan="2" class="tl til">查询日期：</td>
            <td colspan="2" class="til">{{queryYear}}年{{queryMonth}}月{{queryDay}}日 </td>
          </tr>
          <tr>
            <td colspan="2" class="tl til">查询内容：</td>
            <td colspan="6" class="til aliLeft" style="padding-left:32px;"><!--商标名称：-->{{keyword}}</td>
          </tr>
          <tr>
            <td colspan="2" class="tl til">类别：</td>
            <td colspan="6" class="til aliLeft" style="padding-left:32px;">
              <!--<span v-for="i in intCls">{{i}}</span>-->
              <span class="wordBreak">{{intCls}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="tl til">查询方式：<!--{{searchType}}--></td>
            <td colspan="6" class="til aliLeft" style="padding-left:32px;">{{schType}}</td>
          </tr>
        </tbody>
      </table>
      <div class="contTips">
        <p>1.-提示</p>
        <p>--查询涵盖所有已注册商标以及查询日已公布的所有在先申请商标。</p>
        <p>2.-查询</p>
        <div>
          <span>--在第</span>
          <input class="ipt" v-model="intCls" placeholder="" type="text"><!-- min="1" max="45"-->
          <span>类</span>
          <!--<select class="ipt" v-model="findOr">
            <option value ="1">发现</option>
            <option value ="0">未发现</option>
          </select>-->
          <select class="ipt" v-model="findOr">
            <option v-for="option in findOrOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>

          <span>相同或近似申请注册；</span>
        </div>
        <p>3.-分析</p>
        <div>
          <span>根据查询结果，我们认为</span>
          <input class="ipt" v-model="selectTrademark" placeholder="">
          <span>商标在类似商品</span>
          <!--<select class="ipt" v-model="signTrademark">
            <option value ="1">可以</option>
            <option value ="0">不可以</option>
          </select> -->
          <select class="ipt" v-model="signTrademark">
            <option v-for="option in signTrademarkOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <span>注册。</span>
        </div>
      </div>
      <div class="sbmit">
        <input v-bind:disabled="isDisabled" type="submit" @click="tdMarkSchReport()" name="btn_save" value="保存并打印报告" class="btn_save" :class="{'disable': isDisabled==true}" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading', 'error', 'post', 'myResult','checkedItems','keyword','typeResult','searchType','intCls'],
  data() {
    return {
      findOr: '1',
      findOrOptions: [
        { text: '发现', value: '1' },
        { text: '未发现', value: '0' }
      ],
      signTrademark: '1',
      signTrademarkOptions: [
        /*{ text: '可以', value: '1' },
        { text: '不可以', value: '0' }*/
        { text: '建议', value: '1' },
        { text: '不建议', value: '2' },
        { text: '建议尝试', value: '3' }
      ],
      loading2: true,
      queryYear:new Date().getFullYear(),
      queryMonth:new Date().getMonth() + 1,
      queryDay:new Date().getDate(),
      regNos:'',
      //intCls:'',
      intClsCn:'',
      tmNames:'',
      applicantCns:'',
      detailsTypes:'',
      selectPeople:'管理员',
      schType:'',
      schTypeJsMh:'',
      //kind:'',
      selectTrademark:'',
      selectIntCls:'',
      isDisabled:false
    }
  },
  mounted(){
    // this.intCls = this.getIntCls();
    this.selectIntCls = this.getIntCls();
    this.schType = this.searchTypeCn(this.searchType);
    this.schTypeJsMh = this.searchTypeJsMh(this.searchType);
    /*this.intClsCn = this.filterArray(this.typeResult,this.intCls);
    console.log(this.intClsCn);*/
  },
  updated(){
    //this.intCls = this.getIntCls();
    this.schType = this.searchTypeCn(this.searchType);
  },
  methods: {
    searchTypeCn(item){
      var searchType = "";
      if(item==4){
        searchType = "近似查询";
      }else if(item==1){
        searchType = "关键字查询";
      }else if(item==2){
        searchType = "注册号查询";
      }else if(item==3){
        searchType = "申请人查询";
      };
      return searchType
    },
    searchTypeJsMh(item){
      var searchType = "";
      if(item==4){
        searchType = "4";
      }else if(item==1){
        searchType = "1";
      }else if(item==2){
        searchType = "2";
      }else if(item==3){
        searchType = "3";
      };
      return searchType
    },
    /*filterArray(arr1, arr2){
      for (var i = 0 ; i < arr1.length ; i ++ ){
        for(var j = 0 ; j < arr2.length ; j ++ ){
          /*if (arr1[i].id === arr2[j]){
            console.log("test");
            arr1.splice(i,1);
          }*./
        }
      }
      //alert(arr1);
      return arr2;
    },*/
    getRegNos(){
      var rgNos = "";
      for(var i = 0; i < this.checkedItems.length; i++){
        rgNos += this.checkedItems[i].applicantOther2 + ',';
      };
      return rgNos;
    },
    getIntCls(){
      var itCls = "";
      for(var i = 0; i < this.checkedItems.length; i++){
        itCls += this.checkedItems[i].intCls + ',';
      };
      return itCls;
    },
    getTmNames(){
      var tmName = "";
      for(var i = 0; i < this.checkedItems.length; i++){
        tmName += this.checkedItems[i].tmName + ',';
      };
      return tmName;
    },
    getApplicantCns(){
      var applicantCn = "";
      for(var i = 0; i < this.checkedItems.length; i++){
        applicantCn += this.checkedItems[i].applicantCn + ',';
      };
      return applicantCn;
    },
    getDetailsTypes(){
      var detailsType = "";
      for(var i = 0; i < this.checkedItems.length; i++){
        if(this.checkedItems[i].hasOwnProperty("detailsType") ){
        //if(this.checkedItems[i].detailsType != undefined){
          detailsType += this.checkedItems[i].detailsType + ',';
        }else{
          detailsType += "0" + ",";
        }
      };
      return detailsType;
    },
    tdMarkSchReport(){
      //console.log(this.checkedItems);
      this.regNos = this.getRegNos();
      this.selectIntCls = this.getIntCls();
      this.tmNames = this.getTmNames();
      this.applicantCns = this.getApplicantCns();
      this.detailsTypes = this.getDetailsTypes();
      this.schType = this.searchTypeCn(this.searchType);
      this.schTypeJsMh = this.searchTypeJsMh(this.searchType);
      //console.log(this.schTypeJsMh);
      //console.log(this.regNos);
      //console.log("intCls:");
      //console.log(this.intCls);
      // var ret = {
      //   regNos: this.regNos,
      //   intCls: this.intCls,
      //   tmNames: this.tmNames,
      //   applicantCns: this.applicantCns,
      //   detailsTypes: this.detailsTypes,
      //   selectPeople: this.selectPeople,
      //   selectKey: this.keyword,
      //   selectIntCls: this.intCls,
      //   selectType: this.schTypeJsMh,
      //   findIntCls: this.kind,
      //   findOr: this.findOr,
      //   selectTrademark: this.selectTrademark,
      //   signTrademark: this.signTrademark
      // };
      var postData = 'regNos=' + this.regNos + '&intCls=' + this.selectIntCls + '&tmNames=' + encodeURIComponent(this.tmNames) + '&applicantCns=' + encodeURIComponent(this.applicantCns) + '&detailsTypes=' + this.detailsTypes + '&selectPeople=' + encodeURIComponent(this.selectPeople) + '&selectKey=' + encodeURIComponent(this.keyword) + '&selectIntCls=' + this.intCls + '&selectType=' + this.schTypeJsMh + '&findIntCls=' + this.intCls + '&findOr=' + this.findOr + '&selectTrademark=' + this.selectTrademark + '&signTrademark=' + this.signTrademark;
      //window.open('http://192.168.1.117:8080/cnsebe-tools-core/rabbit/makereport.do?' + postData,'_blank');
      location.href = global.Path +　"/rabbit/makereport.do?" + postData;
      this.isDisabled = true;
      //location.href="http://192.168.1.117:8080/cnsebe-tools-core/rabbit/makereport.do?" +postData;
      //location.href="./rabbit/makereport.do?" +postData;
    }
  }
}
</script>

<style>
.searchDetail{padding: 20px 0;}
.searchDetailtb{border: 1px solid #aeaeae;border-collapse:collapse;line-height: 26px}
.searchDetailtb tbody{width: 100%;}
.searchDetailtb tr{width: 100%;}
.searchDetailtb td{border: 1px solid #aeaeae;color: #333;padding: 10px 0}
.searchDetailtb td.tl{text-align: right;padding-left: 15px;padding-right: 15px;}
.searchDetailtb td.til{font-size: 16px;color: #777}
.imgw{max-height: 300px;max-width: 300px}
.goodLists{text-align: left;}
.goodLists div{padding-left: 10px;}
.contTips{text-align: left;text-decoration: none;list-style: none;margin: 0;padding: 15px;font-size: 15px;color:#777;font-size: 16px;}
.ipt{border:1px solid #718da6;border-radius: 2px;width: 100px;}
.sbmit{width: 100%;margin: 50px 0px 20px 0px;text-align: center;color: #fff;font-size:16px;}
.btn_save{font-size: 16px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;padding: 0px 20px;height: 40px;background: #09c;cursor: pointer;border: 1px solid #d5d5d5;letter-spacing: 0.1em;}
  /*.btn_save:hover {color: #fff;background: #09c;border: 0px;} */
 .aliLeft{text-align: left;}
 .disable{background: #ddd;border: 1px solid #d5d5d5;color: #777;}
 .wordBreak{display: block;width: 750px;word-wrap: break-word;}
</style>
